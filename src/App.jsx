import { useMemo, Suspense, lazy, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls, Html } from "@react-three/drei";
import Loader from "./components/Loader";
import "./style.css";

// Lazy load the heavy 3D component
const LazyMacContainer = lazy(() => import("./components/MacContainer"));
const MemoizedMacContainer = memo(LazyMacContainer);

const NAV_LINKS = [
  { label: "Home - ", href: "/" },
  { label: "Contact - ", href: "mailto:muhammadtanveerabbas.dev@gmail.com" },
  { label: "Github", href: "https://github.com/MuhammadTanveerAbbas" },
];

const App = () => {
  const navLinks = useMemo(() => NAV_LINKS, []);

  return (
    <div className="app-wrapper">
      {/* Navigation */}
      <nav className="glassy-nav">
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="nav-link"
            target={label === "Github" ? "_blank" : "_self"}
            rel={label === "Github" ? "noopener noreferrer" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h3 className="masked">Macbook</h3>
        <h5 className="subtext">Scroll down to explore</h5>
      </header>

      {/* 3D Canvas */}
      <div className="canvas-wrapper">
        <Canvas camera={{ fov: 12, position: [0, -10, 220] }} dpr={[1, 2]}>
          <Suspense
            fallback={
              <Html>
                <Loader />
              </Html>
            }
          >
            <Environment
              files={[
                "https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/2k/wide_street_01_2k.exr",
              ]}
            />
            <ScrollControls pages={3}>
              <MemoizedMacContainer />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default App;
