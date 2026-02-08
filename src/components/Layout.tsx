import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Site Header */}
      <header role="banner">
        <Navbar />
      </header>

      {/* Main Content */}
      <main
        id="main-content"
        role="main"
        className="flex-1"
      >
        {children}
      </main>

      {/* Site Footer */}
      <footer role="contentinfo">
        <Footer />
      </footer>

    </div>
  );
};
