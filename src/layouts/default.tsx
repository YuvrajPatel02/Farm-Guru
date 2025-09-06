import { Link } from "react-router-dom"; 
import Navbar from "../components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          className="flex items-center gap-1 text-current"
          to="/" 
          title="Home"
        >
          <span className="text-gray-500">Powered by</span>
          <p className="text-green-700 font-bold">Farm Guru</p>
        </Link>
      </footer>
    </div>
  );
}
