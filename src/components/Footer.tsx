'use client';

import { useRef, useEffect } from 'react';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return;

      const footerRect = footerRef.current.getBoundingClientRect();
      const x = ((e.clientX - footerRect.left) / footerRect.width) * 100;
      const y = ((e.clientY - footerRect.top) / footerRect.height) * 100;

      // Apply spotlight coordinates to the footer only
      footerRef.current.style.setProperty('--x', `${x}%`);
      footerRef.current.style.setProperty('--y', `${y}%`);
    };

    const footerElement = footerRef.current;
    if (footerElement) {
      footerElement.addEventListener('mousemove', handleMouseMove);
      return () => footerElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="py-16 glass rounded-2xl mb-4 border border-border overflow-hidden footer-spotlight relative"
      style={{ '--x': '50%', '--y': '50%' } as React.CSSProperties}
    >
      {/* Subtle background pattern that reacts to spotlight */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.75 0.25 180) 0.5px, transparent 0.5px),
              linear-gradient(90deg, oklch(0.75 0.25 180) 0.5px, transparent 0.5px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl overflow-hidden relative z-10">

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
          <div className="text-muted-foreground/60 text-xs mono transition-colors duration-300 hover:text-muted-foreground/80">
            © 2025 Ripple Protocol
          </div>

          {/* Large Brand Name - 2030s Minimal Aesthetic */}
          <div className="relative flex justify-center px-8">
            <h1 className="text-6xl md:text-8xl lg:text-[12rem] xl:text-[14rem] text-center font-space-grotesk font-bold leading-none tracking-tighter whitespace-nowrap footer-2030-text">
              RIPPLE
            </h1>
          </div>

          {/* Tagline */}
          <div className="text-muted-foreground/40 text-xs mono tracking-widest transition-colors duration-300 hover:text-muted-foreground/60">
            DECENTRALIZED • OPEN SOURCE • WEB3
          </div>

        </div>

      </div>
    </footer>
  );
}