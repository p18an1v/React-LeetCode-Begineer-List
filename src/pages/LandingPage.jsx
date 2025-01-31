import React from "react";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  BarChart,
  PieChart,
  Bar,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  ChevronRight,
  ArrowDown,
  Rocket,
  Check,
  Target,
  TrendingUp,
} from "lucide-react";

const LandingPage = () => {
  // Chart data
  const barChartData = [
    { name: "Easy", value: 40, fill: "#4ADE80" },
    { name: "Medium", value: 60, fill: "#FBBF24" },
    { name: "Hard", value: 30, fill: "#F87171" },
  ];

  const pieChartData = [
    { name: "Completed", value: 70, fill: "#4ADE80" },
    { name: "Pending", value: 30, fill: "#F87171" },
  ];

  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 text-black min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[94vh] flex items-center justify-center text-center bg-[#D3D4DD] from-gray-50 to-gray-200">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-gray-800"
        >
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">
            LeetCode Beginner List
          </h1>
          <p className="text-xl font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            Track your progress, solve problems, and ace your coding interviews
            with an intuitive platform designed for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/questions")}
            className="bg-black text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center mx-auto"
          >
            Get Started <ChevronRight className="ml-2" />
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 w-full text-center"
        >
          <ArrowDown className="mx-auto text-3xl text-gray-700 animate-bounce" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-16">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: <Rocket className="w-12 h-12 text-blue-600" />,
                title: "Track Progress",
                description:
                  "Monitor your coding journey with structured question sets and clear progress tracking.",
              },
              {
                icon: <Check className="w-12 h-12 text-green-600" />,
                title: "Organized Practice",
                description:
                  "Questions are categorized by topics and difficulty levels to help you practice systematically.",
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-purple-600" />,
                title: "Stay Motivated",
                description:
                  "Visualize your growth and stay consistent in solving problems to ace your coding interviews.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gray-100 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-20 px-8 bg-[#D3D4DD]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
            Your Progress
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
                Questions by Difficulty
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
                Completion Status
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-lg mb-8">
            Join thousands of developers who are improving their skills with
            LeetCode Beginner List.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/questions")}
            className="bg-black text-white px-10 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300"
          >
            Get Started Now
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;