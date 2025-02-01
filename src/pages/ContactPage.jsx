import Footer from "@/components/Footer/Footer";
import React from "react";
import { Mail, Headset, Lightbulb, Users } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 text-black min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow p-6 sm:p-10">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Have questions, feedback, or need support? We're here to help! Reach out to us via email, and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6 sm:p-8 max-w-xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-black flex items-center justify-center gap-2">
            <Mail className="text-blue-500" size={24} />
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-5 sm:mb-6">
            If you have any inquiries or need assistance, feel free to email us at:
          </p>
          <div className="bg-gray-200 p-3 sm:p-4 rounded-lg inline-block hover:bg-gray-300 transition duration-300">
            <a
              href="mailto:support@leetcodebeginnerlist.com"
              className="text-blue-600 hover:text-blue-800 font-semibold text-base sm:text-lg"
            >
              support@leetcodebeginnerlist.com
            </a>
          </div>
          <p className="text-gray-600 mt-5 sm:mt-6">
            We aim to respond within <span className="font-semibold text-blue-500">24 hours.</span>
          </p>
        </div>

        {/* Additional Content Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-black">
            Why Contact Us?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Whether you're facing issues, have suggestions, or just want to connect, we’d love to hear from you! Your feedback helps improve LeetCode Beginner List.
          </p>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Support Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-5 sm:p-6 hover:shadow-lg transition duration-300">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <Headset className="text-blue-500" size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">Support</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Need help with your account or technical issues? We’re here to assist you.
              </p>
            </div>

            {/* Feedback Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-5 sm:p-6 hover:shadow-lg transition duration-300">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <Lightbulb className="text-yellow-500" size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">Feedback</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Share your thoughts to help us improve the platform and add new features.
              </p>
            </div>

            {/* Partnership Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md p-5 sm:p-6 hover:shadow-lg transition duration-300">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <Users className="text-green-500" size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">Partnerships</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Interested in collaborating? Let’s create something amazing together.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Include the Footer component */}
      <Footer />
    </div>
  );
};

export default Contact;

