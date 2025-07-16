import React, { useEffect, useState } from "react";

const NatureElements: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Flying Birds */}
      <div
        className="bird animate-fly"
        style={{ top: "15%", animationDelay: "0s" }}
      >
        🕊️
      </div>
      <div
        className="bird animate-fly"
        style={{ top: "25%", animationDelay: "3s" }}
      >
        🐦
      </div>
      <div
        className="bird animate-fly"
        style={{ top: "35%", animationDelay: "6s" }}
      >
        🕊️
      </div>

      {/* Floating Flowers */}
      <div
        className="flower animate-float animate-bloom"
        style={{ top: "20%", left: "10%", animationDelay: "1s" }}
      >
        🌸
      </div>
      <div
        className="flower animate-float animate-bloom"
        style={{ top: "60%", left: "15%", animationDelay: "3s" }}
      >
        🌺
      </div>
      <div
        className="flower animate-float animate-bloom"
        style={{ top: "40%", right: "20%", animationDelay: "2s" }}
      >
        🌻
      </div>
      <div
        className="flower animate-float animate-bloom"
        style={{ top: "70%", right: "10%", animationDelay: "4s" }}
      >
        🌷
      </div>
      <div
        className="flower animate-float animate-bloom"
        style={{ top: "30%", left: "80%", animationDelay: "5s" }}
      >
        🌹
      </div>

      {/* Swaying Leaves */}
      <div
        className="leaf-decoration animate-sway"
        style={{ top: "10%", left: "5%", animationDelay: "0s" }}
      >
        🍃
      </div>
      <div
        className="leaf-decoration animate-sway"
        style={{ top: "50%", left: "3%", animationDelay: "2s" }}
      >
        🌿
      </div>
      <div
        className="leaf-decoration animate-sway"
        style={{ top: "80%", left: "8%", animationDelay: "1s" }}
      >
        🍃
      </div>
      <div
        className="leaf-decoration animate-sway"
        style={{ top: "15%", right: "5%", animationDelay: "3s" }}
      >
        🌿
      </div>
      <div
        className="leaf-decoration animate-sway"
        style={{ top: "65%", right: "3%", animationDelay: "1.5s" }}
      >
        🍃
      </div>
      <div
        className="leaf-decoration animate-sway"
        style={{ top: "85%", right: "7%", animationDelay: "2.5s" }}
      >
        🌿
      </div>

      {/* Additional Nature Elements */}
      <div
        className="flower animate-pulse-slow"
        style={{ top: "45%", left: "50%", animationDelay: "2s" }}
      >
        🌼
      </div>
      <div
        className="flower animate-bounce-slow"
        style={{ top: "25%", left: "70%", animationDelay: "1s" }}
      >
        🌾
      </div>
      <div
        className="leaf-decoration animate-float"
        style={{ top: "55%", left: "25%", animationDelay: "3s" }}
      >
        🌱
      </div>
      <div
        className="leaf-decoration animate-float"
        style={{ top: "75%", left: "60%", animationDelay: "4s" }}
      >
        🌿
      </div>
    </div>
  );
};

export default NatureElements;
