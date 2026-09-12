import type { ReactNode } from "react";
import { ScientificText } from "@/components/scientific-text";

interface ResultColumn {
  key: string;
  label: string;
  align?: "left" | "right";
}

interface ResultTableProps {
  caption: string;
  columns: ResultColumn[];
  rows: Array<Record<string, ReactNode>>;
}

export function ResultTable({ caption, columns, rows }: ResultTableProps) {
  return (
    <div className="result-table-block">
    <p className="result-table-heading" aria-hidden="true">{caption}</p>
    <p className="result-table-hint">Scroll horizontally to see all columns →</p>
    <div className="result-table-scroll" role="region" tabIndex={0} aria-label={caption}>
      <table className="result-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={column.align === "right" ? "result-table__numeric" : undefined}
              >
                <ScientificText text={column.label} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={String(row.id ?? row.case ?? rowIndex)}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={column.align === "right" ? "result-table__numeric" : undefined}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
