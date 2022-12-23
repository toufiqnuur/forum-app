import { NavLink as Link } from "react-router-dom";

export default function NavLink({ icon, name, href }) {
  return (
    <Link
      to={href}
      className={({ isActive }) =>
        `hover:no-underline ${isActive ? "text-black" : "text-zinc-500"}`
      }
    >
      <div className="flex flex-col items-center space-y-2 py-1.5 px-4">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm font-light">{name}</span>
      </div>
    </Link>
  );
}
