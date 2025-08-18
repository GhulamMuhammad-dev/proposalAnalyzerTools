"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import GridLayout from "react-grid-layout";
import { ResizableBox } from "react-resizable";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const breakpoints = ["base", "sm", "md", "lg", "xl"];

// Canvas widths (px) for each breakpoint
const breakpointWidths = {
  base: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export default function GridEditor() {
  // ---- Lock height to viewport ----
  const [viewportH, setViewportH] = useState(800);
  useEffect(() => {
    const update = () => setViewportH(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ---- Breakpoint + canvas width ----
  const [currentBp, setCurrentBp] = useState("base");
  const [canvasWidth, setCanvasWidth] = useState(breakpointWidths.base);
  useEffect(() => {
    setCanvasWidth(breakpointWidths[currentBp]);
  }, [currentBp]);

  // ---- Grid settings per breakpoint ----
  const [gridCfg, setGridCfg] = useState({
    base: { cols: 2, rowHeight: 80, margin: [10, 10] },
    sm: { cols: 2, rowHeight: 80, margin: [10, 10] },
    md: { cols: 4, rowHeight: 100, margin: [12, 12] },
    lg: { cols: 6, rowHeight: 110, margin: [14, 14] },
    xl: { cols: 12, rowHeight: 120, margin: [16, 16] },
  });

  // ---- Layouts per breakpoint ----
  const initialBase = [
    { i: "box-1", x: 0, y: 0, w: 1, h: 2, kind: "box" },
    { i: "box-2", x: 1, y: 0, w: 1, h: 3, kind: "text" },
  ];
  const [layouts, setLayouts] = useState({
    base: initialBase,
    sm: initialBase,
    md: [
      { i: "box-1", x: 0, y: 0, w: 2, h: 2, kind: "box" },
      { i: "box-2", x: 2, y: 0, w: 2, h: 3, kind: "text" },
    ],
    lg: [
      { i: "box-1", x: 0, y: 0, w: 3, h: 2, kind: "box" },
      { i: "box-2", x: 3, y: 0, w: 2, h: 3, kind: "text" },
    ],
    xl: [
      { i: "box-1", x: 0, y: 0, w: 4, h: 2, kind: "box" },
      { i: "box-2", x: 4, y: 0, w: 3, h: 3, kind: "text" },
    ],
  });

  // Unique ids
  const idCounter = useRef(3);
  const newId = () => `box-${idCounter.current++}`;

  // ---- Palette drag helpers ----
  const onDragStartPalette = (e, kind) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ kind }));
  };

  // Handle drop into grid
  const handleDrop = (_layout, droppedItem, nativeEvent) => {
    try {
      const payloadStr =
        nativeEvent?.dataTransfer?.getData("application/json") || "{}";
      const payload = JSON.parse(payloadStr);
      const id = newId();

      const newItem = {
        i: id,
        x: droppedItem.x || 0,
        y: droppedItem.y || 0,
        w: droppedItem.w || 2,
        h: droppedItem.h || 2,
        kind: payload.kind || "box",
      };

      setLayouts((prev) => ({
        ...prev,
        [currentBp]: [...prev[currentBp], newItem],
      }));
    } catch {
      // ignore invalid drop
    }
  };

  // Persist moves/resizes
  const handleLayoutChange = (next) => {
    setLayouts((prev) => ({
      ...prev,
      [currentBp]: next.map((n) => {
        const existing = prev[currentBp].find((it) => it.i === n.i);
        return { ...n, kind: existing?.kind || "box" };
      }),
    }));
  };

  // Remove item
  const removeItem = (id) => {
    setLayouts((prev) => ({
      ...prev,
      [currentBp]: prev[currentBp].filter((it) => it.i !== id),
    }));
  };

  // Export JSON
  const downloadJSON = () => {
    const data = {
      gridCfg,
      layouts,
      canvasWidths: breakpointWidths,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "grid-editor-export.json";
    a.click();
  };

  // Drop size
  const droppingItem = useMemo(() => ({ i: "__drop__", w: 2, h: 2 }), []);

  const { cols, rowHeight, margin } = gridCfg[currentBp];

  // --- Row numbering ---
  const totalRows =  Math.ceil(viewportH / rowHeight) + 10; // buffer
  const rowNumbers = Array.from({ length: totalRows }, (_, i) => i + 1);

  // Render item content by kind
  const renderItemContent = (item) => {
    switch (item.kind) {
      case "text":
        return <div className="p-2">📝 Text Box</div>;
      case "image":
        return (
          <div className="p-2">
            🖼️ <img src="https://via.placeholder.com/80" alt="" />
          </div>
        );
      default:
        return <div className="p-2">📦 Box</div>;
    }
  };

  return (
    <section className="bg-gray-800 text-white min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-80 bg-gray-900 p-4 border-r border-gray-700 flex flex-col gap-6">
        <h2 className="text-xl font-bold">Control Panel</h2>

        {/* Breakpoint */}
        <label className="flex flex-col gap-1">
          <span className="text-sm opacity-80">Breakpoint</span>
          <select
            value={currentBp}
            onChange={(e) => setCurrentBp(e.target.value)}
            className="text-white bg-gray-800 p-2 rounded"
          >
            {breakpoints.map((bp) => (
              <option key={bp} value={bp}>
                {bp}
              </option>
            ))}
          </select>
        </label>

        {/* Grid settings */}
        <div className="space-y-3">
          <h3 className="font-semibold">Grid Settings ({currentBp})</h3>
          <label className="flex items-center justify-between gap-2">
            <span>Columns</span>
            <input
              type="number"
              min={1}
              max={48}
              value={cols}
              onChange={(e) =>
                setGridCfg((g) => ({
                  ...g,
                  [currentBp]: {
                    ...g[currentBp],
                    cols: Math.max(1, parseInt(e.target.value || "1", 10)),
                  },
                }))
              }
              className="w-24 bg-gray-800 p-1 rounded text-right"
            />
          </label>
          <label className="flex items-center justify-between gap-2">
            <span>Row height (px)</span>
            <input
              type="number"
              min={10}
              value={rowHeight}
              onChange={(e) =>
                setGridCfg((g) => ({
                  ...g,
                  [currentBp]: {
                    ...g[currentBp],
                    rowHeight: Math.max(
                      10,
                      parseInt(e.target.value || "10", 10)
                    ),
                  },
                }))
              }
              className="w-24 bg-gray-800 p-1 rounded text-right"
            />
          </label>
          <label className="flex items-center justify-between gap-2">
            <span>Margin (px)</span>
            <input
              type="number"
              min={0}
              value={margin[0]}
              onChange={(e) => {
                const v = Math.max(0, parseInt(e.target.value || "0", 10));
                setGridCfg((g) => ({
                  ...g,
                  [currentBp]: { ...g[currentBp], margin: [v, v] },
                }));
              }}
              className="w-24 bg-gray-800 p-1 rounded text-right"
            />
          </label>
        </div>

        {/* Palette */}
        <div className="space-y-2">
          <h3 className="font-semibold">Palette (drag into canvas)</h3>
          <div
            draggable
            onDragStart={(e) => onDragStartPalette(e, "box")}
            className="cursor-grab select-none p-2 rounded bg-blue-500/80 hover:bg-blue-500 text-center"
          >
            + Box
          </div>
          <div
            draggable
            onDragStart={(e) => onDragStartPalette(e, "text")}
            className="cursor-grab select-none p-2 rounded bg-emerald-500/80 hover:bg-emerald-500 text-center"
          >
            + Text Box
          </div>
          <div
            draggable
            onDragStart={(e) => onDragStartPalette(e, "image")}
            className="cursor-grab select-none p-2 rounded bg-purple-500/80 hover:bg-purple-500 text-center"
          >
            + Image Box
          </div>
        </div>

        <button
          onClick={downloadJSON}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold p-2 rounded"
        >
          Export JSON
        </button>
      </aside>

      {/* Canvas preview */}
      <main className="flex-1 flex items-center justify-center p-4">
        <ResizableBox
          width={canvasWidth}
          height={viewportH}
          minConstraints={[320, viewportH]}
          maxConstraints={[1600, viewportH]}
          axis="x"
          resizeHandles={["e"]}
          onResizeStop={(_, data) => setCanvasWidth(data.size.width)}
        >
          <div className="flex h-full bg-gray-900 rounded-lg shadow-inner overflow-y-auto">
            {/* Row numbers gutter */}
            <div className="w-10 flex flex-col text-xs text-gray-400 items-center py-2">
              {rowNumbers.map((n) => (
                <div
                  key={n}
                  style={{ height: rowHeight }}
                  className="flex items-start justify-center"
                >
                  {n}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex-1 p-4">
              <GridLayout
                width={canvasWidth - 40} // subtract gutter
                cols={cols}
                rowHeight={rowHeight}
                margin={margin}
                compactType="vertical"
                preventCollision={false}
                isDroppable
                droppingItem={droppingItem}
                onDrop={handleDrop}
                layout={layouts[currentBp]}
                onLayoutChange={handleLayoutChange}
                draggableHandle=".drag-handle"
              >
                {layouts[currentBp].map((item) => (
                  <div
                    key={item.i}
                    className="bg-blue-400/90 rounded-lg shadow-md relative flex items-start"
                  >
                    {/* drag handle */}
                    <div className="drag-handle cursor-grab px-2 py-1 text-xs font-semibold bg-blue-600/70 rounded-tl-lg">
                      ⋮⋮
                    </div>
                    {/* content */}
                    <div className="flex-1 flex items-center justify-center font-bold">
                      {renderItemContent(item)}
                    </div>
                    {/* remove */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.i);
                      }}
                      className="absolute top-1 right-1 text-xs bg-red-500 hover:bg-red-600 rounded px-2 py-0.5"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </GridLayout>
            </div>
          </div>
        </ResizableBox>
      </main>
    </section>
  );
}
