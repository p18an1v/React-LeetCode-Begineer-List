import Footer from "@/components/Footer/Footer";
import React from "react";

const About = () => {
  const features = [
    {
      title: "Track Your Progress",
      description:
        "Easily monitor your coding journey with structured question sets and clear progress tracking.",
      image: "https://i.pinimg.com/236x/cc/1e/d3/cc1ed3abb2f2f31481be2f393ce18384.jpg", // Replace with your image
    },
    {
      title: "Organized Practice",
      description:
        "Questions are categorized by topics and difficulty levels to help you practice systematically.",
      image: "https://i.pinimg.com/736x/2d/8f/71/2d8f7105d2930ce8fd6afefa089ad5e0.jpg", // Replace with your image
    },
    {
      title: "Stay Motivated",
      description:
        "Visualize your growth and stay consistent in solving problems to ace your coding interviews.",
      image: "https://i.pinimg.com/236x/0a/45/ee/0a45eede9944f1d8790bb8efcb82f6ac.jpg", // Replace with your image
    },
    {
      title: "Personalized Learning",
      description: "Simplified journey to start Leetcoding.",
      image: "https://i.pinimg.com/236x/f2/df/90/f2df902adfb9b5548c91a9055977aa56.jpg", // Replace with your image
    }    
  ];

  return (
    <div className="bg-[#D3D4DD] text-black min-h-screen  flex flex-col">
      {/* Main Content */}
      <main className="flex-grow p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            About LeetCode Beginner List
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            LeetCode Beginner List is your ultimate companion to streamline coding
            practice and track progress effectively. Dive into structured
            questions, stay organized, and elevate your problem-solving skills!
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-black">{feature.title}</h2>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Join thousands of developers who are improving their skills with LeetCode Beginner List.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
            Get Started Now
          </button>
        </div>
      </main>

      {/* Include the Footer component */}
      <Footer />
    </div>
  );
};

export default About;