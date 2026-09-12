"use client";

import { useId, useRef, useState } from "react";

export interface MethodStage {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly summary: string;
  readonly detail: string;
}

export function MethodExplainer({ stages }: { stages: readonly MethodStage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const instanceId = useId().replaceAll(":", "");

  function selectStage(index: number, moveFocus: boolean) {
    setActiveIndex(index);
    if (moveFocus) {
      tabRefs.current[index]?.focus();
    }
  }

  function handleTabKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % stages.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + stages.length) % stages.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = stages.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      selectStage(nextIndex, true);
    }
  }

  return (
    <div className="method-explainer method-explainer--motion-aware">
      <div className="method-explainer__tabs" role="tablist" aria-label="Method stages">
        {stages.map((stage, index) => {
          const tabId = `${instanceId}-method-tab-${stage.id}`;
          const panelId = `${instanceId}-method-panel-${stage.id}`;
          const selected = index === activeIndex;

          return (
            <button
              key={stage.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectStage(index, false)}
              onKeyDown={(event) => handleTabKey(event, index)}
            >
              <span>{stage.number}</span>
              <strong>{stage.title}</strong>
            </button>
          );
        })}
      </div>

      <div className="method-explainer__panels">
        {stages.map((stage, index) => {
          const tabId = `${instanceId}-method-tab-${stage.id}`;
          const panelId = `${instanceId}-method-panel-${stage.id}`;
          const titleId = `${instanceId}-method-title-${stage.id}`;

          return (
            <section
              key={stage.id}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={index !== activeIndex}
              className="method-explainer__panel"
            >
              <div
                className="method-explainer__visual"
                role="region"
                tabIndex={0}
                aria-labelledby={titleId}
              >
                <div className="method-explainer__sequence" aria-hidden="true">
                  {stages.map((sequenceStage, sequenceIndex) => (
                    <span
                      key={sequenceStage.id}
                      className={
                        sequenceIndex === index
                          ? "is-current"
                          : sequenceIndex < index
                            ? "is-complete"
                            : undefined
                      }
                    >
                      {sequenceStage.number}
                    </span>
                  ))}
                </div>
                <p className="method-explainer__stage-label">Stage {stage.number}</p>
                <h3 id={titleId}>{stage.title}</h3>
                <p className="method-explainer__summary">{stage.summary}</p>
                <p className="method-explainer__detail">{stage.detail}</p>
              </div>
            </section>
          );
        })}
      </div>

      <div className="method-explainer__actions">
        <button
          type="button"
          aria-label="Previous method stage"
          disabled={activeIndex === 0}
          onClick={() => selectStage(activeIndex - 1, true)}
        >
          <span aria-hidden="true">←</span> Previous
        </button>
        <p aria-live="polite">
          Step {activeIndex + 1} of {stages.length}
        </p>
        <button
          type="button"
          aria-label="Next method stage"
          disabled={activeIndex === stages.length - 1}
          onClick={() => selectStage(activeIndex + 1, true)}
        >
          Next <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
