"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { SimpleWalletConnect } from "@/components/ui/SimpleWalletConnect";
import { useState } from "react";

export default function NavbarHeader() {
  const navItems = [
    {
      name: "Trade",
      link: "#trade",
    },
    {
      name: "Portfolio", 
      link: "#portfolio",
    },
    {
      name: "Analytics",
      link: "#analytics",
    },
    {
      name: "Docs",
      link: "#docs",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar className="fixed top-0 left-0 right-0 z-50">
        {/* Desktop Navigation */}
        <NavBody className="glass border-b border-border/50">
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-1">
            <SimpleWalletConnect />
            <NavbarButton variant="primary" className="animated-gradient glow-hover whitespace-nowrap">Launch</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="glass border-b border-border/50">
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="glass border border-border/50"
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-muted-foreground hover:text-foreground transition-colors glow-hover"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <div className="w-full">
                <SimpleWalletConnect />
              </div>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full animated-gradient glow-hover"
              >
                Launch App
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}