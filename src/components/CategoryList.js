export default function CategoryList({ categories, current, onChange }) {
  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {categories.map((category, index) => (
        <button
          className={`badge__category ${
            current === category && "border-blue-600 text-blue-600"
          }`}
          onClick={() => onChange(current === category ? null : category)}
          key={index}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
