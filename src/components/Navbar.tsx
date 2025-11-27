import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo  use the image favicon.ico*/}
          {/* Logo (using uploaded favicon image) */}
<Link to="/" className="flex items-center space-x-2">
  <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
    <img
      src="/ZekTechLogo.png"
      alt="ZEKTECH Logo"
      className="w-5 h-5"
    />
  </div>

  {/* Text container */}
  <div className="flex flex-col leading-tight  sm:flex">
    <span className="font-bold text-xl text-foreground">ZEKTECH</span>
    <span className="text-xs text-muted-foreground mt-[-2px] ">
      Solutions Ventures
    </span>
  </div>
</Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
            <Link to="/consultation">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <img
                        src="/ZekTechLogo.png"
                        alt="ZEKTECH Logo"
                        className="w-5 h-5"
                      />
                    </div>
                    <span className="font-bold text-xl">ZEKTECH</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                        isActive(link.path)
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <Link to="/consultation" onClick={() => setIsOpen(false)}>
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;