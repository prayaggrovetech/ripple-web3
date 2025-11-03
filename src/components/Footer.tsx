export function Footer() {
  return (
    <footer className="px-4 py-16 md:px-8 glass rounded-2xl mx-2 mb-4 border border-border">
      <div className="mx-auto">

        {/* Large Brand Name */}
        <div className="mb-16">
          <h1 className="text-8xl md:text-9xl lg:text-[28rem] font-black hero-title leading-none tracking-tighter">
            RIPPLE
          </h1>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">

          {/* DeFi */}
          <div className="space-y-6">
            <h4 className="text-foreground font-medium text-sm mono">DeFi</h4>
            <div className="space-y-3">
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Yield Farming</a>
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Liquidity Mining</a>
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Staking</a>
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Cross-chain</a>
            </div>
          </div>

          {/* Protocols */}
          <div className="space-y-6">
            <h4 className="text-foreground font-medium text-sm mono">Protocols</h4>
            <div className="space-y-3">
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Uniswap</a>
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Aave</a>
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Compound</a>
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Curve</a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-6">
            <h4 className="text-foreground font-medium text-sm mono">Community</h4>
            <div className="space-y-3">
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Discord</a>
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Telegram</a>
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">GitHub</a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h4 className="text-foreground font-medium text-sm mono">Resources</h4>
            <div className="space-y-3">
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Documentation</a>
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Audits</a>
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Bug Bounty</a>
              <a href="#" className="block text-muted-foreground text-sm hover:text-primary transition-colors">Governance</a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm mono">
            © 2024 Ripple Protocol. Decentralized & Open Source.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors mono">Privacy</a>
            <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors mono">Terms</a>
            <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors mono">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}