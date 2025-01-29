import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import LoginRegisterForm from "./LoginRegisterForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#09090B] text-[#FAFAFA] shadow-md">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-[hsl(225.9,70.7%,60.2%)] transition-colors duration-300"
      >
        LeetCode Beginner List
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8 text-lg">
        <NavItem to="/about">About</NavItem>
        <NavItem to="/services">Services</NavItem>
        <NavItem to="/contact">Contact</NavItem>
        <Dialog>
          <LoginRegisterForm />
        </Dialog>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-7 h-7 text-[#FAFAFA]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#09090B] text-[#FAFAFA]">
            <div className="flex flex-col space-y-6 text-lg p-4">
              <NavItem to="/about" onClick={() => setOpen(false)}>
                About
              </NavItem>
              <NavItem to="/services" onClick={() => setOpen(false)}>
                Services
              </NavItem>
              <NavItem to="/contact" onClick={() => setOpen(false)}>
                Contact
              </NavItem>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline text-[#09090B]">Login / Register</Button>
                </DialogTrigger>
                <LoginRegisterForm />
              </Dialog>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

// Reusable NavItem Component for smoother UI
function NavItem({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative group hover:text-[hsl(225.9,70.7%,60.2%)] transition-colors duration-300"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[hsl(225.9,70.7%,40.2%)] transition-all group-hover:w-full"></span>
    </Link>
  );
}

