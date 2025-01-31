import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Footer() {
  return (
    <footer className="bg-[#09090B] text-[#FAFAFA] py-12 mt-16">
      <div className="container mx-auto px-6">
        <Card className="bg-transparent border-none shadow-none">
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">About</h3>
              <p className="text-gray-400">
                LeetCode Beginner List helps you monitor your progress on LeetCode problems and improve your coding skills.
              </p>
            </div>

            {/* Quick Links Section */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <FooterLink to="/about">About</FooterLink>
                <FooterLink to="/">Login</FooterLink>
                <FooterLink to="/questions">Questions</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <FooterLink to="/faq">FAQ</FooterLink>
                <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
                <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
              </ul>
            </div>

            {/* Social Media Section */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <SocialIcon href="https://github.com" Icon={Github} />
                <SocialIcon href="https://linkedin.com" Icon={Linkedin} />
                <SocialIcon href="https://twitter.com" Icon={Twitter} />
                <SocialIcon href="mailto:support@leetcodebeginnerlist.com" Icon={Mail} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} LeetCode Beginner List. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Reusable Footer Link Component
function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );
}

// Social Icon Component
function SocialIcon({ href, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
    >
      <Icon className="w-6 h-6" />
    </a>
  );
}