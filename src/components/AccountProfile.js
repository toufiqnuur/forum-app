export default function AccountProfile({ avatar, name, size, className }) {
  const SIZE = { SM: "24", DEFAULT: "32", LG: "48" };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img
        src={avatar}
        width={SIZE[size ?? "DEFAULT"]}
        height={SIZE[size ?? "DEFAULT"]}
        alt={name}
        className="rounded-full"
      />
      <span className="font-bold">{name}</span>
    </div>
  );
}
