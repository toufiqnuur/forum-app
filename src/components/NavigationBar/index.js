import {
  IoChatbubbles,
  IoLogIn,
  IoLogOut,
  IoStatsChart,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authRemoved } from "../../store/auth/action";
import NavButton from "./NavButton";

export default function NavigationBar() {
  const { authorized } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <nav className="fixed bottom-0 left-0 w-full border-t bg-white shadow-md">
      <div className="flex items-center justify-center space-x-4 md:space-x-6">
        <NavButton
          onClick={() => navigate("/")}
          icon={<IoChatbubbles />}
          name="Threads"
        />
        <NavButton
          onClick={() => navigate("/leaderboard")}
          icon={<IoStatsChart />}
          name="Leaderboard"
        />
        <NavButton
          onClick={() =>
            authorized ? dispatch(authRemoved()) : navigate("/login")
          }
          icon={authorized ? <IoLogOut /> : <IoLogIn />}
          name={authorized ? "Logout" : "Login"}
        />
      </div>
    </nav>
  );
}
