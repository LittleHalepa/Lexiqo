import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Footer() {
  const [activeNav, setActiveNav] = useState("");
  const navigate = useNavigate();
  const { publicId } = useParams();

  if (!publicId) return null; 

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/");
    const lastSegment = segments[segments.length - 1];
    setActiveNav(lastSegment);
  }, []);

  const handleNavClick = (target: string) => {
    setActiveNav(target);
    navigate(`/user/${publicId}/dashboard/${target}`);
  };

  const navItems = [
    { id: "add-collection", icon: "bxs-layer-plus", label: "Add" },
    { id: "home", icon: "bxs-home", label: "Home" },
    { id: "library", icon: "bx-library", label: "Library" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-md flex flex-row justify-around items-end h-18 z-100">
      {navItems.map(({ id, icon, label }) => (
        <div
          key={id}
          className={`flex justify-center items-center flex-col w-17 h-12 relative transition-all ${
            activeNav === id ? "bg-[#8B5CF6] button-animation" : "bg-transparent"
          }`}
          onClick={() => handleNavClick(id)}
        >
          <div className="z-1 flex flex-col justify-center w-full items-center -translate-y-1.5">
            <i className={`bx ${icon} text-3xl`}></i>
            <p className="text-sm font-bold">{label}</p>
          </div>
          <div
            className={`absolute -top-1/2 w-full h-full z-0 rounded-full transition-all ${
              activeNav === id ? "bg-[#8B5CF6] button-animation" : "bg-transparent"
            }`}
          ></div>
        </div>
      ))}
    </nav>
  );
}
