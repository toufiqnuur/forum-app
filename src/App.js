import { Route, Routes } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";
import ThreadPage from "./pages/ThreadPage";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import AddThreadPage from "./pages/AddThreadPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/threads/:threadId" element={<ThreadPage />} />
        <Route path="/new" element={<AddThreadPage />} />
      </Routes>
    </BaseLayout>
  );
}

export default App;
