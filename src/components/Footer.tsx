export function Footer() {
  return (
    <footer className="px-4 py-16 md:px-8 glass rounded-2xl mx-2 mb-4 border border-border overflow-visible">
      <div className="mx-auto overflow-visible">

        {/* Minimal Links Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-8 md:space-y-0">
          
          {/* Essential Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <a href="#" className="footer-link text-muted-foreground text-sm hover:text-primary transition-all duration-300 mono">Trade</a>
            <a href="#" className="footer-link text-muted-foreground text-sm hover:text-primary transition-all duration-300 mono">Stake</a>
            <a href="#" className="footer-link text-muted-foreground text-sm hover:text-primary transition-all duration-300 mono">Docs</a>
            <a href="#" className="footer-link text-muted-foreground text-sm hover:text-primary transition-all duration-300 mono">Discord</a>
            <a href="#" className="footer-link text-muted-foreground text-sm hover:text-primary transition-all duration-300 mono">Twitter</a>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6">
            <a href="#" className="footer-link text-muted-foreground text-xs hover:text-primary transition-all duration-300 mono">Privacy</a>
            <a href="#" className="footer-link text-muted-foreground text-xs hover:text-primary transition-all duration-300 mono">Terms</a>
          </div>
        </div>

        {/* Integrated Brand Section */}
        <div className="text-center space-y-6">
          
          {/* Copyright */}
          <div className="text-muted-foreground/60 text-xs mono">
            © 2025 Ripple Protocol
          </div>

          {/* Large Brand Name */}
          <div className="relative cursor-pointer group px-8 md:px-16 lg:px-24 overflow-visible">
            <h1 className="text-6xl md:text-8xl lg:text-[16rem] xl:text-[18rem] text-center font-space-grotesk font-bold leading-none tracking-tighter footer-brand-hover overflow-visible whitespace-nowrap">
              RIPPLE
            </h1>
          </div>

          {/* Tagline */}
          <div className="text-muted-foreground/40 text-xs mono tracking-widest">
            DECENTRALIZED • OPEN SOURCE • WEB3
          </div>

        </div>

      </div>
    </footer>
  );
}