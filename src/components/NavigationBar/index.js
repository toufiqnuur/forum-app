import { IoAdd, IoChatbubbles, IoStatsChart } from "react-icons/io5";
import { useSelector } from "react-redux";
import NavLink from "./NavLink";

export default function NavigationBar() {
  const { authUser } = useSelector((state) => state);

  return (
    <nav className="fixed bottom-0 left-0 w-full border-t bg-white shadow-md">
      <div className="flex items-center justify-center space-x-4 md:space-x-6">
        <NavLink href="/" icon={<IoChatbubbles />} name="Threads" />
        {!!authUser && (
          <NavLink
            href="/new"
            icon={
              <div className="px rounded-md bg-blue-300 p-2 text-blue-600">
                <IoAdd />
              </div>
            }
          />
        )}
        <NavLink
          href="/leaderboard"
          icon={<IoStatsChart />}
          name="Leaderboard"
        />
      </div>
    </nav>
  );
}
