import Footer from "@/components/Footer/Footer";
import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Track Your Progress",
      description:
        "Monitor your journey with structured sets and clear milestones.",
      image: "https://i.pinimg.com/736x/cc/1e/d3/cc1ed3abb2f2f31481be2f393ce18384.jpg",
    },
    {
      title: "Organized Practice",
      description:
        "Practice systematically with topics and difficulty levels.",
      image: "https://i.pinimg.com/736x/de/09/ea/de09eab8e382aaeeccb8fdccfefd42e4.jpg",
    },
    {
      title: "Stay Motivated",
      description:
        "Visualize your growth and stay consistent to ace interviews.",
      image: "https://i.pinimg.com/736x/b9/34/1a/b9341af03a32f4f0ea953f70c48dbf70.jpg",
    },
    {
      title: "Community Support",
      description:
        "Learn with like-minded coders. Share tips, solutions, and motivation.",
      image: "https://i.pinimg.com/736x/68/84/ca/6884cab532309cae58ba45bbd3aa30cd.jpg",
    },
    {
      title: "Personalized Learning",
      description: "A simplified path to start your LeetCode journey.",
      image: "https://i.pinimg.com/736x/ec/71/98/ec71986452fb1011f045515b34e590b2.jpg",
    },
  ];

  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col font-mono">
      {/* Hero Section */}
      <main className="flex-grow p-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            About LeetCode Beginner List
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-400 leading-relaxed">
            Practice with purpose. Build confidence, one problem at a time
            A beginner-friendly roadmap to mastering problem-solving.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
               className="bg-zinc-900 rounded-2xl shadow-md overflow-hidden border border-zinc-800 hover:border-white transition-all duration-300 hover:shadow-cyan-500/20"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-white-300">
                  {feature.title}
                </h2>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4 text-purple-400">
            Ready to Start?
          </h2>
          <p className="text-lg text-gray-400 mb-6 italic">
            “Track. Solve. Level Up.”
          </p>
          <button
            onClick={() => navigate("/questions")}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-white-500/20"
          >
            Get Started Now 🚀
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
