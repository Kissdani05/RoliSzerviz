"use client";

import React, { useState } from "react";

export interface ChartSeries {
  name: string;
  color: string;
}

export interface ChartRow {
  label: string;
  fullLabel: string;
  values: number[];
}

interface AdminBarChartProps {
  title: string;
  series: ChartSeries[];
  rows: ChartRow[];
  formatValue: (value: number) => string;
  formatAxis?: (value: number) => string;
}

// Rounds up to 1, 2 or 5 × 10ⁿ so the axis labels stay readable
function niceMax(value: number): number {
  if (value <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 5, 10].find((candidate) => candidate * magnitude >= value)!;
  return step * magnitude;
}

const AdminBarChart: React.FC<AdminBarChartProps> = ({
  title,
  series,
  rows,
  formatValue,
  formatAxis = formatValue,
}) => {
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const max = niceMax(Math.max(...rows.flatMap((row) => row.values)));
  const ticks = [max, max / 2, 0];

  return (
    <figure className="adm-chart">
      <figcaption className="adm-card-title">{title}</figcaption>
      {series.length > 1 && (
        <ul className="adm-legend">
          {series.map((item) => (
            <li key={item.name}>
              <span className="adm-swatch" style={{ background: item.color }} aria-hidden="true" />
              {item.name}
            </li>
          ))}
        </ul>
      )}

      <div className="adm-chart-plot" aria-hidden="true">
        <div className="adm-chart-axis">
          {ticks.map((tick) => (
            <span key={tick}>{formatAxis(tick)}</span>
          ))}
        </div>
        <div className="adm-chart-area">
          <div className="adm-chart-grid">
            {ticks.map((tick) => (
              <span key={tick} />
            ))}
          </div>
          <div className="adm-chart-columns">
            {rows.map((row, rowIndex) => (
              <div
                key={row.fullLabel}
                className={`adm-chart-column ${activeRow === rowIndex ? "active" : ""}`}
                onMouseEnter={() => setActiveRow(rowIndex)}
                onMouseLeave={() => setActiveRow(null)}
              >
                <div className="adm-chart-bars">
                  {row.values.map((value, seriesIndex) =>
                    value > 0 ? (
                      <span
                        key={series[seriesIndex].name}
                        className="adm-chart-bar"
                        style={{
                          height: `${(value / max) * 100}%`,
                          background: series[seriesIndex].color,
                        }}
                      />
                    ) : null
                  )}
                </div>
                {activeRow === rowIndex && (
                  <div
                    className="adm-tooltip"
                    style={
                      // Opens towards the side of the plot that has more room
                      rowIndex >= rows.length / 2
                        ? { right: `${((rows.length - rowIndex) / rows.length) * 100}%` }
                        : { left: `${((rowIndex + 1) / rows.length) * 100}%` }
                    }
                  >
                    <strong>{row.fullLabel}</strong>
                    {series.map((item, seriesIndex) => (
                      <span key={item.name} className="adm-tooltip-row">
                        <span className="adm-swatch" style={{ background: item.color }} />
                        {item.name}: <b>{formatValue(row.values[seriesIndex])}</b>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={`adm-chart-labels ${rows.length > 6 ? "dense" : ""}`}>
          {rows.map((row) => (
            <span key={row.fullLabel}>{row.label}</span>
          ))}
        </div>
      </div>

      <details className="adm-chart-table">
        <summary>Táblázat</summary>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Hónap</th>
              {series.map((item) => (
                <th key={item.name} className="adm-num">{item.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.fullLabel}>
                <td>{row.fullLabel}</td>
                {row.values.map((value, seriesIndex) => (
                  <td key={series[seriesIndex].name} className="adm-num">{formatValue(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
};

export default AdminBarChart;
