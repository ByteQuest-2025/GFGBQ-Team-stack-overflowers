import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, ExternalLink } from "lucide-react";

const quickLinks = [
  { href: "/register-complaint", label: "Register Grievance" },
  { href: "/track", label: "Track Complaint" },
  { href: "/public-stats", label: "Public Dashboard" },
  { href: "/faq", label: "FAQs" },
];

const helpLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-bold text-lg">
                NS
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">NagarSevak</span>
                <span className="text-xs text-sidebar-foreground/70 leading-tight">नागरसेवक</span>
              </div>
            </div>
            <p className="text-sm text-sidebar-foreground/80 leading-relaxed">
              AI-Powered Government Grievance Redressal System. Your voice, our priority.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-sidebar-accent hover:bg-sidebar-primary/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-sidebar-accent hover:bg-sidebar-primary/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-sidebar-accent hover:bg-sidebar-primary/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4">Help & Support</h4>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-light" />
                <span className="text-sm text-sidebar-foreground/70">
                  Municipal Corporation Building,<br />
                  New Delhi - 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-light" />
                <span className="text-sm text-sidebar-foreground/70">1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-light" />
                <span className="text-sm text-sidebar-foreground/70">support@nagarsevak.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-sidebar-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-sidebar-foreground/60">
            © {new Date().getFullYear()} NagarSevak. Government of India Initiative.
          </p>
          <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
            <a href="https://india.gov.in" className="flex items-center gap-1 hover:text-sidebar-foreground transition-colors">
              india.gov.in <ExternalLink className="w-3 h-3" />
            </a>
            <span>|</span>
            <a href="https://digitalindia.gov.in" className="flex items-center gap-1 hover:text-sidebar-foreground transition-colors">
              Digital India <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
