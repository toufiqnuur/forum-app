export default function NavButton({ icon, name, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center space-y-2 py-1.5 px-4 text-zinc-500"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-light">{name}</span>
    </button>
  );
}
