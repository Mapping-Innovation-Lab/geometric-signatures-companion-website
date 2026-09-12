"""Render only the manuscript assignment rule from the reviewed revision-2 data.

Run with conda base Python; pass the scientific-plotting skill's scripts folder
as --plotting-helpers. The source JSON retains all four rule configurations.
"""
import argparse
import hashlib
import json
from pathlib import Path
import sys

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
import numpy as np

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--plotting-helpers", type=Path, required=True)
args = parser.parse_args()
sys.path.insert(0, str(args.plotting_helpers))
from generic_helpers import setup_generic_style
from plot_utils import load_palette, save_figure, setup_global_rcparams

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/supplementary/archive/data/paraphrase-stability-v2-rev2.json"
OUTPUT = ROOT / "public/supplementary/paraphrase-stability-manuscript-rule"
CASES = [
    ("sr_signal_detection", "Special\nrelativity"),
    ("higgs", "Higgs\nmechanism"),
    ("godel", r'G\"odel' + "\nincompleteness"),
    ("deep_learning", "Deep\nlearning"),
    ("attention", "Attention\nmechanism"),
]
FAMILIES = [
    ("single_pairs", "Single paraphrases (10 pairs)"),
    ("disjoint_1v4", "Disjoint splits: 1 vs 4 (5)"),
    ("disjoint_2v3", "Disjoint splits: 2 vs 3 (10)"),
    ("loo_vs_full", "Leave-one-out vs full (not independent)"),
]

source_bytes = SOURCE.read_bytes()
data = json.loads(source_bytes)
assert data["package_revision"] == 2
setup_global_rcparams()
setup_generic_style(use_latex=True)
matplotlib.rcParams["figure.constrained_layout.use"] = False
palette = load_palette("okabe_ito")
colors = [palette[1], palette[5], palette[0], palette[3]]
fig, ax = plt.subplots(figsize=(7.0, 4.6))
bar_width = 0.19
bars_checked = 0
for j, (family, _) in enumerate(FAMILIES):
    for i, (case, _) in enumerate(CASES):
        values = data["cases"][case]["per_config"]["production_v3"]["corpus"][family]
        count = values["n_concepts_available"]
        # Every displayed family has informative concepts in this reviewed dataset.
        # Never draw an unavailable summary as a measured zero.
        assert count > 0, (case, family, "requires explicit missing-data treatment")
        median, low, high = (values[k] for k in ("median_of_concept_means", "q25", "q75"))
        assert 0 <= low <= median <= high <= 1
        x = i + (j - 1.5) * bar_width
        hollow = family == "loo_vs_full"
        bar = ax.bar(x, median, width=bar_width,
                     facecolor="white" if hollow else colors[j],
                     edgecolor=colors[j] if hollow else "black",
                     linewidth=1.1 if hollow else 0.6, zorder=2)
        assert bar.patches[0].get_height() == median
        bars_checked += 1
        ax.errorbar(x, median, yerr=[[median - low], [high - median]], fmt="none",
                    ecolor="black", elinewidth=0.8, capsize=2.5, capthick=0.8, zorder=3)
        if count < 10:
            ax.text(x, high + 0.025, f"{count}/10", ha="center", va="bottom",
                    fontsize=9, rotation=90)
assert bars_checked == 20
ax.set_xticks(np.arange(len(CASES)), [label for _, label in CASES], fontsize=10)
ax.set_ylim(0, 1.12)
ax.set_yticks([0, 0.25, 0.5, 0.75, 1.0])
ax.tick_params(axis="both", labelsize=10)
ax.set_ylabel("Jaccard overlap of assigned sets", fontsize=12)
ax.text(0.025, 0.97, "Assignment rule used in the paper", transform=ax.transAxes,
        ha="left", va="top", fontsize=11)
handles = [Patch(facecolor="white" if j == 3 else colors[j],
                 edgecolor=colors[j] if j == 3 else "black", label=label)
           for j, (_, label) in enumerate(FAMILIES)]
fig.legend(handles=handles, loc="lower center", ncol=2, frameon=False,
           fontsize=10, bbox_to_anchor=(0.5, 0.0), handlelength=1.3, columnspacing=1.5)
fig.subplots_adjust(bottom=0.27, top=0.98)
qc = save_figure(fig, OUTPUT, verify=True)
plt.close(fig)
print("Source SHA-256:", hashlib.sha256(source_bytes).hexdigest())
print("Checked all 20 bar heights against manuscript-rule summaries.")
print(qc)
