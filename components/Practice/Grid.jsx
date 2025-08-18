"use client";
import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

// Tailwind col/row span classes
const colSpanClasses = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  12: "col-span-12",
};
const rowSpanClasses = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  6: "row-span-6",
};

// Breakpoints
const breakpoints = ["base", "sm", "md", "lg", "xl"];

// Simulated canvas widths per breakpoint (px)
const breakpointWidths = {
  base: 360,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const Box = ({ index, config, currentBp, isSelected, onSelect }) => {
  const { colSpan, rowSpan } = config[currentBp] || { colSpan: 1, rowSpan: 1 };
  const boxClasses = `cursor-pointer bg-blue-400 p-4 rounded-lg shadow-md text-center font-bold border-2
    ${colSpanClasses[colSpan]} ${rowSpanClasses[rowSpan]} ${
    isSelected ? "border-yellow-400" : "border-transparent"
  }`;

  return (
    <div className={boxClasses} onClick={() => onSelect(index)}>
      Box {index + 1}
    </div>
  );
};

const Grid = () => {
  // Viewport height for locking ResizableBox height
  const [viewportHeight, setViewportHeight] = useState(800);
  useEffect(() => {
    const update = () => setViewportHeight(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Current breakpoint + canvas width
  const [currentBp, setCurrentBp] = useState("base");
  const [canvasWidth, setCanvasWidth] = useState(breakpointWidths.base);
  useEffect(() => {
    // Snap canvas width when breakpoint changes
    setCanvasWidth(breakpointWidths[currentBp]);
  }, [currentBp]);

  // Grid settings per breakpoint (store UN-PREFIXED classes)
  const [gridSettings, setGridSettings] = useState({
    base: { cols: "grid-cols-2", rows: "grid-rows-2", gap: "gap-4" },
    sm: { cols: "grid-cols-2", rows: "grid-rows-2", gap: "gap-4" },
    md: { cols: "grid-cols-4", rows: "grid-rows-4", gap: "gap-6" },
    lg: { cols: "grid-cols-6", rows: "grid-rows-4", gap: "gap-8" },
    xl: { cols: "grid-cols-12", rows: "grid-rows-6", gap: "gap-12" },
  });

  // Boxes have per-breakpoint span config (numbers only)
  const [boxes, setBoxes] = useState([
    {
      base: { colSpan: 1, rowSpan: 1 },
      sm: { colSpan: 1, rowSpan: 1 },
      md: { colSpan: 2, rowSpan: 1 },
      lg: { colSpan: 3, rowSpan: 2 },
      xl: { colSpan: 4, rowSpan: 2 },
    },
    {
      base: { colSpan: 1, rowSpan: 1 },
      sm: { colSpan: 1, rowSpan: 1 },
      md: { colSpan: 2, rowSpan: 2 },
      lg: { colSpan: 2, rowSpan: 2 },
      xl: { colSpan: 3, rowSpan: 2 },
    },
  ]);

  const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxUpdate = (property, value) => {
    if (selectedBox === null) return;
    setBoxes((prev) => {
      const updated = [...prev];
      updated[selectedBox] = {
        ...updated[selectedBox],
        [currentBp]: { ...updated[selectedBox][currentBp], [property]: value },
      };
      return updated;
    });
  };

  const addBox = () => {
    const newBox = {};
    breakpoints.forEach((bp) => {
      newBox[bp] = { colSpan: 1, rowSpan: 1 };
    });
    setBoxes((b) => [...b, newBox]);
  };

  const removeBox = () => {
    if (selectedBox === null) return;
    setBoxes((b) => b.filter((_, i) => i !== selectedBox));
    setSelectedBox(null);
  };

  // PREVIEW classes (apply ONLY the selected breakpoint, no responsive prefixes)
  const previewGridClasses = `${gridSettings[currentBp].cols} ${gridSettings[currentBp].rows} ${gridSettings[currentBp].gap}`;

  // EXPORT classes (combine all breakpoints WITH responsive prefixes)
  const exportGridClasses = breakpoints
    .map((bp) => {
      const s = gridSettings[bp];
      const prefix = bp === "base" ? "" : `${bp}:`;
      return `${prefix}${s.cols} ${prefix}${s.rows} ${prefix}${s.gap}`;
    })
    .join(" ");

  // Code export (grid with responsive classes + boxes with responsive spans)
  const generateCode = () => {
    const boxCode = boxes
      .map(
        (box, i) => `
        <div className="bg-blue-400 p-4 rounded-lg shadow-md text-center font-bold 
          ${breakpoints
            .map((bp) => {
              const prefix = bp === "base" ? "" : `${bp}:`;
              return `${prefix}${colSpanClasses[box[bp].colSpan]} ${prefix}${rowSpanClasses[box[bp].rowSpan]}`;
            })
            .join(" ")}">
          Box ${i + 1}
        </div>`
      )
      .join("\n");

    return `import React from "react";

const CustomGrid = () => {
  return (
    <section className="bg-gray-800 text-white min-h-screen flex items-center justify-center p-6">
      <div className="grid ${exportGridClasses} p-4 bg-gray-900 w-full h-full">
        ${boxCode}
      </div>
    </section>
  );
};

export default CustomGrid;
`;
  };

  const downloadCode = () => {
    const code = generateCode();
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "CustomGrid.jsx";
    link.click();
  };

  return (
    <section className="bg-gray-800 text-white min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 p-4 border-r border-gray-700 flex flex-col space-y-6">
        <h2 className="text-xl font-bold mb-2">Control Panel</h2>

        {/* Breakpoint selector */}
        <label className="flex flex-col">
          Breakpoint
          <select
            value={currentBp}
            onChange={(e) => setCurrentBp(e.target.value)}
            className="text-white bg-gray-800 p-1 rounded"
          >
            {breakpoints.map((bp) => (
              <option key={bp} value={bp}>
                {bp}
              </option>
            ))}
          </select>
        </label>

        {/* Grid controls (unprefixed values) */}
        <div className="space-y-2">
          <h3 className="font-semibold">Grid Settings ({currentBp})</h3>

          <label className="flex flex-col">
            Columns
            <select
              value={gridSettings[currentBp].cols}
              onChange={(e) =>
                setGridSettings((gs) => ({
                  ...gs,
                  [currentBp]: { ...gs[currentBp], cols: e.target.value },
                }))
              }
              className="text-white bg-gray-800 p-1 rounded"
            >
              {[
                "grid-cols-1",
                "grid-cols-2",
                "grid-cols-3",
                "grid-cols-4",
                "grid-cols-6",
                "grid-cols-12",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            Rows
            <select
              value={gridSettings[currentBp].rows}
              onChange={(e) =>
                setGridSettings((gs) => ({
                  ...gs,
                  [currentBp]: { ...gs[currentBp], rows: e.target.value },
                }))
              }
              className="text-white bg-gray-800 p-1 rounded"
            >
              {["grid-rows-1", "grid-rows-2", "grid-rows-3", "grid-rows-4"].map(
                (r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                )
              )}
            </select>
          </label>

          <label className="flex flex-col">
            Gap
            <select
              value={gridSettings[currentBp].gap}
              onChange={(e) =>
                setGridSettings((gs) => ({
                  ...gs,
                  [currentBp]: { ...gs[currentBp], gap: e.target.value },
                }))
              }
              className="text-white bg-gray-800 p-1 rounded"
            >
              {["gap-0", "gap-2", "gap-4", "gap-6", "gap-8", "gap-12"].map(
                (g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                )
              )}
            </select>
          </label>
        </div>

        {/* Selected box controls */}
        {selectedBox !== null && (
          <div className="space-y-2">
            <h3 className="font-semibold">
              Box {selectedBox + 1} ({currentBp})
            </h3>

            <label className="flex flex-col">
              Col Span
              <select
                value={boxes[selectedBox][currentBp].colSpan}
                onChange={(e) =>
                  handleBoxUpdate("colSpan", parseInt(e.target.value, 10))
                }
                className="text-white bg-gray-800 p-1 rounded"
              >
                {Object.keys(colSpanClasses).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col">
              Row Span
              <select
                value={boxes[selectedBox][currentBp].rowSpan}
                onChange={(e) =>
                  handleBoxUpdate("rowSpan", parseInt(e.target.value, 10))
                }
                className="text-white bg-gray-800 p-1 rounded"
              >
                {Object.keys(rowSpanClasses).map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>

            <button
              onClick={removeBox}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
            >
              Remove Box
            </button>
          </div>
        )}

        <button
          onClick={addBox}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
        >
          Add Box
        </button>

        <button
          onClick={downloadCode}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold p-2 rounded"
        >
          Download Code
        </button>
      </aside>

      {/* Preview */}
      <main className="flex-1 flex items-center justify-center p-4">
        <ResizableBox
          width={canvasWidth}
          height={viewportHeight}
          minConstraints={[300, viewportHeight]}
          maxConstraints={[1600, viewportHeight]}
          axis="x"
          resizeHandles={["e"]}
          onResizeStop={(_, data) => setCanvasWidth(data.size.width)}
        >
          <div
            className={`grid ${previewGridClasses} p-4 bg-gray-900 h-screen`}
            style={{ width: "100%" }}
          >
            {boxes.map((box, i) => (
              <Box
                key={i}
                index={i}
                config={box}
                currentBp={currentBp}
                isSelected={i === selectedBox}
                onSelect={setSelectedBox}
              />
            ))}
          </div>
        </ResizableBox>
      </main>
    </section>
  );
};

export default Grid;
