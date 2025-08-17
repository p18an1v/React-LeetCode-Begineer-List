import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import LoginRegisterForm from "@/components/auth/LoginRegisterForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { jwtDecode } from "jwt-decode";
import NavItem from "./NavItem";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsLoggedIn(true);

        if (decodedToken.role === "ROLE_ADMIN") {
          setIsAdmin(true);
          navigate("/admin");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, [navigate]);

  const handleLogin = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsLoggedIn(true);

        if (decodedToken.role === "ADMIN") {
          setIsAdmin(true);
          navigate("/admin");
          toast.success("Login successful!");
        } else {
          navigate("/questions");
          toast.success("Login successful!");
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
    toast.success("Logout successful!");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-[#09090B]/85 text-[#FAFAFA] shadow-md backdrop-blur-sm">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-[hsl(225.9,70.7%,60.2%)] transition-colors duration-300"
        >
          LeetCode Beginner List
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-lg">
          {/* {!isAdmin && <NavItem to="/">Home</NavItem>} */}
          {!isAdmin && <NavItem to="/questions">Questions</NavItem>}
          {!isAdmin && <NavItem to="/about">About</NavItem>}
          {!isAdmin && <NavItem to="/contact">Contact</NavItem>}

          {isLoggedIn ? (
            <Button onClick={handleLogout} variant="outline" className="text-[#09090B]">
              Logout
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <LoginRegisterForm onLogin={handleLogin} />
              </DialogTrigger>
            </Dialog>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-7 h-7 text-[#FAFAFA]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#09090B]/90 text-[#FAFAFA] backdrop-blur-sm">
              <div className="flex flex-col space-y-6 text-lg p-4">
                {!isAdmin && <NavItem to="/" onClick={() => setOpen(false)}>Home</NavItem>}
                {!isAdmin && <NavItem to="/about" onClick={() => setOpen(false)}>About</NavItem>}
                {!isAdmin && <NavItem to="/questions" onClick={() => setOpen(false)}>Questions</NavItem>}
                {!isAdmin && <NavItem to="/contact" onClick={() => setOpen(false)}>Contact</NavItem>}

                {isLoggedIn ? (
                  <Button onClick={handleLogout} variant="outline" className="text-[#09090B]">
                    Logout
                  </Button>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <LoginRegisterForm onLogin={handleLogin} />
                    </DialogTrigger>
                  </Dialog>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
}
