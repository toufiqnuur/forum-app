export default function Container({ children, className, attrs }) {
  return (
    <div
      className={`mx-auto max-w-screen-md px-6 ${className}`}
      data-testid="container-test"
      {...attrs}
    >
      {children}
    </div>
  );
}
