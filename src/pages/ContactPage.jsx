import Footer from "@/components/Footer/Footer";
import React from "react";
import { Mail, Headset, Lightbulb, Users } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow p-6 sm:p-12">
        {/* Hero Section */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Get in Touch
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions, ideas, or need support? We’re just one email away.
            Let’s make your coding journey smoother and more exciting.
          </p>
        </div>

        {/* Email Section */}
        <div className="bg-black border border-gray-800 rounded-2xl shadow-lg p-8 sm:p-10 max-w-2xl mx-auto mb-16 text-center relative">
  <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
    <Mail className="text-cyan-400" size={26} />
    Email Us
  </h2>
  <p className="text-gray-400 mb-6">
    For inquiries or assistance, reach us at:
  </p>

  {/* Email + Copy */}
  <div className="flex items-center justify-center gap-3 bg-black px-4 py-3 rounded-xl border border-gray-700 hover:border-cyan-400 transition">
    <a
      href="mailto:p18an1v@gmail.com"
      className="text-cyan-400 hover:text-cyan-300 font-medium text-lg"
    >
      p18an1v@gmail.com
    </a>
    <button
      onClick={() => navigator.clipboard.writeText("p18an1v@gmail.com")}
      className="px-3 py-1.5 text-sm bg-cyan-500 hover:bg-cyan-600 text-white rounded-md transition"
    >
      Copy
    </button>
  </div>

  {/* Reply Note */}
  {/* <p className="text-gray-400 mt-5 text-sm">
    We usually reply within{" "}
    <span className="text-cyan-400 font-semibold">24 hours</span>.
  </p> */}
</div>


        {/* Why Contact Us Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Why Reach Out?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Whether you’re stuck, inspired, or curious—we’d love to hear from
            you. Your voice helps us shape the future of LeetCode Beginner List.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Support */}
          <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6 hover:border-cyan-400 hover:shadow-cyan-400/30 transition">
            <div className="flex items-center justify-center mb-4">
              <Headset className="text-cyan-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Support</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Facing technical issues or account problems? Our team is ready to
              help you out.
            </p>
          </div>

          {/* Feedback */}
          <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6 hover:border-yellow-400 hover:shadow-yellow-400/30 transition">
            <div className="flex items-center justify-center mb-4">
              <Lightbulb className="text-yellow-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Feedback</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Share your thoughts to help us improve features and make coding
              practice better.
            </p>
          </div>

          {/* Partnerships */}
          <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6 hover:border-green-400 hover:shadow-green-400/30 transition">
            <div className="flex items-center justify-center mb-4">
              <Users className="text-green-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Partnerships</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Looking to collaborate or build together? We’re open to exciting
              opportunities.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;



