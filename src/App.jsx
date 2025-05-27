// src/App.jsx
import { memo, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls } from "@react-three/drei";
import MacContainer from "./MacContainer";
import "./style.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "mailto:muhammadtanveerabbas.dev@gmail.com" },
  { label: "Github", href: "https://github.com/MuhammadTanveerAbbas" },
];

const MemoizedMacContainer = memo(MacContainer);

const App = () => {
  const navLinks = useMemo(() => NAV_LINKS, []);

  return (
    <div className="w-full h-screen font-mono relative overflow-hidden">
      {/* Navigation Bar */}
      <nav className="navbar glassy-nav flex gap-6 px-4 py-2 absolute top-4 left-1/2 -translate-x-1/2 z-10">
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="nav-link text-white font-[400] transition duration-200"
            target={label === "Github" ? "_blank" : "_self"}
            rel={label === "Github" ? "noopener noreferrer" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Hero Section */}
      <header className="absolute flex flex-col items-center top-32 left-1/2 -translate-x-1/2 text-white z-10 px-4">
        <h3 className="masked text-5xl sm:text-6xl md:text-7xl tracking-tighter font-[700]">
          Macbook
        </h3>
        <h5 className="text-gray-400 mt-2 text-sm sm:text-base">
          Scroll down to explore
        </h5>
      </header>

      {/* 3D Canvas */}
      <div className="canvas-wrapper">
        <Canvas
          camera={{ fov: 12, position: [0, -10, 220] }}
          dpr={[1, 2]}
          gl={{ antialias: true, preserveDrawingBuffer: false }}
        >
          <Environment
            files={[
              "https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/wide_street_01_4k.exr",
            ]}
          />
          <ScrollControls pages={3}>
            <MemoizedMacContainer />
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
};

export default App;
