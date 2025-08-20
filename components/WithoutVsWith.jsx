import React from "react";

function WithoutVsWith() {
  const withoutTool = [
    "❌ Wasting hours rewriting proposals",
    "❌ Low response rates",
    "❌ Constant self-doubt",
  ];

  const withTool = [
    "✅ Instant AI feedback",
    "✅ Higher proposal success rate",
    "✅ More confidence + more clients",
  ];

  return (
    <section className="section-class">
    <div className="section-container ">
      <header className="section-header">
        <h2 className="body-heading ">Without vs. With Proposal Analyzer</h2>
      </header>

      <div className="grid w-full  relative gap-2 md:grid-cols-3">
        {/* Without Tool */}
        <div className="basic-card-class ">
          <h3 className="text-2xl font-semibold sm:text-3xl">Without the Tool:</h3>
          <ul>
            {withoutTool.map((item, index) => (
              <li key={index} className="text-lg ">{item}</li>
            ))}
          </ul>
        </div>

        {/* With Tool */}
        <div className="basic-card-class md:col-span-2">
          <h3 className="text-2xl font-semibold sm:text-3xl">With the Tool:</h3>
          <ul>
            {withTool.map((item, index) => (
              <li key={index} className="text-lg ">{item}</li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </section>
  );
}

export default WithoutVsWith;
