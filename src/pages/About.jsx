import Footer from "@/_compo/Footer";
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
      title: "Stay Motivated",
      description:
        "Visualize your growth and stay consistent in solving problems to ace your coding interviews.",
      image: "https://i.pinimg.com/236x/d5/3c/50/d53c50d147efd26c59588c7669f7c876.jpg", // Replace with your image
    },
    {
      title: "Stay Motivated",
      description:
        "Visualize your growth and stay consistent in solving problems to ace your coding interviews.",
      image: "https://via.placeholder.com/300x200?text=Stay+Motivated", // Replace with your image
    },
  ];

  return (
    <div className="bg-[#09090B] text-[#FAFAFA] min-h-screen flex flex-col">
      {/* Include the Navbar component */}
      

      {/* Main Content */}
      <main className="flex-grow p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            About LeetCode Tracker
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-[#A0A0A0]">
            LeetCode Tracker is your ultimate companion to streamline coding
            practice and track progress effectively. Dive into structured
            questions, stay organized, and elevate your problem-solving skills!
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#09090B] rounded-lg shadow-lg overflow-hidden  border border-[#FAFAFA] transform hover:scale-105 transition-transform"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-[#A0A0A0]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Include the Footer component */}
      <Footer/>
    </div>
  );
};

export default About;