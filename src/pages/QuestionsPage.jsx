import { useState, useEffect } from "react";
import QuestionList from "@/components/QuestionTracker/QuestionList";
import { getUserDetails } from "/src/services/userService.js";

function QuestionsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetails()
        .then((user) => setUserId(user.id))
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen p-6 sm:p-10 shadow-md flex flex-col bg-[#D3D4DD]">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-8 py-6">
          <QuestionList isLoggedIn={isLoggedIn} userId={userId} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto text-white py-6">
        <div className="container mx-auto px-4 sm:px-8 text-center">
          {/* <Footer /> */}
        </div>
      </footer>
    </div>
  );
}

export default QuestionsPage;



