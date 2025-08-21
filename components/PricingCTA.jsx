import React from "react";

function PricingCTA() {
  return (
    <section className="section-class">
    <div className="section-container">
      <header className="section-header">
        <h2 className="body-heading">Pricing / Free Trial CTA</h2>
      </header>
      <div className="flex flex-col border-primaryColor-400 border rounded w-full items-center py-16 gap-2">
      <p className="text-xl font-semibold">Try it FREE today.</p>
      <p className="text-lg text-center">Analyze your first proposal in seconds no credit card required.</p>
      <button className="primary-button primary-gradient">Start Free Analysis</button>
      </div>
      </div>
    </section>
  );
}

export default PricingCTA;
