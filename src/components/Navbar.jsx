import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Default to dark mode
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (!stored) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between gap-3">
        {/* ✅ Title only — no logo */}
        <a href="#hero" className="text-xl font-bold text-primary whitespace-nowrap">
          <span className="text-glow text-foreground">Daniel's</span> Place
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Theme toggle + mobile menu button */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen((p) => !p)}
            className="md:hidden p-2 text-foreground ml-14"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile full-screen menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
