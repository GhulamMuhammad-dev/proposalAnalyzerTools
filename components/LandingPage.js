export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="flex justify-between items-center px-8 py-4 shadow">
        <span className="text-orange-600 font-bold text-xl">ProposalPro</span>
        <button onClick={onStart} className="bg-orange-600 text-white px-4 py-2 rounded">Get Started</button>
      </nav>
      <section className="px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Craft Winning Proposals with AI</h1>
          <p className="text-lg mb-6">Get instant feedback and improvements for your freelancing proposals to win more clients and projects.</p>
          <button onClick={onStart} className="bg-orange-600 text-white px-6 py-3 rounded text-lg">Analyze Your Proposal Now</button>
        </div>
        <img src="https://illustrations.popsy.co/amber/designer.svg" alt="Illustration" className="w-full"/>
      </section>
    </div>
  );
}