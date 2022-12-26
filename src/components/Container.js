export default function Container({ children, className, attrs }) {
  return (
    <div className={`mx-auto px-6 max-w-screen-md ${className}`} {...attrs}>
      {children}
    </div>
  );
}
