import { useState, useEffect } from "react";
// import QuestionList from "@/_compo/QuestionList";
import QuestionList from "@/components/QuestionTracker/QuestionList";
import Footer from "@/_compo/Footer";
import { getUserDetails } from "/src/services/userService.js"; // ✅ Correct import

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetails()
        .then((user) => setUserId(user.id)) // ✅ Extract `id` from API response
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, [isLoggedIn]);

  return (
    <>
      <QuestionList isLoggedIn={isLoggedIn} userId={userId} />
      <Footer />
    </>
  );
}

export default Home;


