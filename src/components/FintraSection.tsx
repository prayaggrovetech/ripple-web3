export function FintraSection() {
  return (
    <section className="w-full px-4 py-16 md:px-8 md:py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Large FINTRA Text */}
          <div className="space-y-8">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight text-lime-400">
              FINTRA
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Advanced financial technology platform powering the future of investing. 
              Built with cutting-edge algorithms and machine learning to optimize 
              your investment strategy.
            </p>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-lime-400">24.7K</div>
                  <div className="text-xs text-gray-400">ACTIVE TRADES</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-lime-400">$2.1M</div>
                  <div className="text-xs text-gray-400">DAILY VOLUME</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-lime-400">99.9%</div>
                  <div className="text-xs text-gray-400">UPTIME</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                  <span className="text-sm">AI Portfolio Optimization</span>
                  <span className="text-lime-400 text-sm">Active</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                  <span className="text-sm">Risk Assessment Engine</span>
                  <span className="text-lime-400 text-sm">Running</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded">
                  <span className="text-sm">Market Sentiment Analysis</span>
                  <span className="text-lime-400 text-sm">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Ready to experience the future of investing?
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-lime-400 hover:bg-lime-500 text-black px-8 py-3 rounded-full font-semibold transition-colors">
              Start Investing Today
            </button>
            <button className="border border-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:border-lime-400 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}