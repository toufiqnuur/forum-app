import Header from "./Header";
import NavigationBar from "./NavigationBar";

export default function BaseLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <NavigationBar />
    </>
  );
}
