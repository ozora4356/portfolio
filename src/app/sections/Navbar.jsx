import { AlignJustify, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
        <div className="flex items-center justify-between py-5 px-8 c-space">
          <a
            href="/"
            className="text-white font-bold text-xl hover:text-neutral-300 transition-colors"
          >
            Logo
          </a>
          <button onClick={toggleMenu} className="w-6 h-6 text-white hover:text-neutral-300 transitions-colors" aria-label="Toggle menu">
            {isOpen ? (
              <X/>
            ) : (
              <AlignJustify/>
            )}
          </button>
        </div>
    </header>
  );
}
