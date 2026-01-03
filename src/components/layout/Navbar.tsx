import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Globe, Minus, Plus, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/register-complaint", label: "Register Grievance" },
  { href: "/track", label: "Track Status" },
  { href: "/public-stats", label: "Statistics" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const location = useLocation();

  const adjustFontSize = (delta: number) => {
    setFontSize(prev => Math.max(0.8, Math.min(1.2, prev + delta)));
    document.documentElement.style.fontSize = `${16 * (fontSize + delta)}px`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-bold text-lg">
            NS
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-lg leading-tight text-foreground">NagarSevak</span>
            <span className="text-xs text-muted-foreground leading-tight">नागरसेवक</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                location.pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Font Size Controls */}
          <div className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-lg bg-muted/50">
            <button
              onClick={() => adjustFontSize(-0.1)}
              className="p-1 hover:bg-muted rounded"
              aria-label="Decrease font size"
            >
              <Minus className="w-3 h-3" />
            </button>
            <Type className="w-4 h-4" />
            <button
              onClick={() => adjustFontSize(0.1)}
              className="p-1 hover:bg-muted rounded"
              aria-label="Increase font size"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 hover:bg-muted text-sm font-medium transition-colors"
          >
            <Globe className="w-4 h-4" />
            {language === 'en' ? 'EN' : 'हिं'}
          </button>

          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/admin">
              <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                Admin Portal
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="container py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    location.pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/admin" className="flex-1">
                  <Button className="w-full bg-gradient-primary">Admin</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
