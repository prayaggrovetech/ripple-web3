export function InvestingSection() {
  return (
    <section className="py-16 md:py-24 glass rounded-3xl glow">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight hero-title">
              DEFI PROTOCOLS
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Access cutting-edge decentralized finance protocols. 
              Yield farming, liquidity mining, and cross-chain swaps 
              with institutional-grade security.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-foreground">Cross-chain liquidity pools</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-foreground">Automated yield strategies</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-foreground">Multi-sig wallet integration</span>
              </div>
            </div>
          </div>

          {/* Right Content - Demo Crypto */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-muted-foreground mono">LIVE MARKETS</h3>
            <div className="space-y-4">
              <div className="glass p-6 rounded-lg glow-hover border border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-lg mono">Bitcoin</h4>
                    <p className="text-muted-foreground mono">BTC/USD</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg mono">$67,420.69</p>
                    <p className="text-success mono">+4.42% (+$2,847)</p>
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-lg glow-hover border border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-lg mono">Ethereum</h4>
                    <p className="text-muted-foreground mono">ETH/USD</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg mono">$3,842.15</p>
                    <p className="text-destructive mono">-2.1% (-$82.47)</p>
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-lg glow-hover border border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-lg mono">Solana</h4>
                    <p className="text-muted-foreground mono">SOL/USD</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg mono">$248.93</p>
                    <p className="text-success mono">+7.8% (+$18.02)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}