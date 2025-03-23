import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import TRUNK from "vanta/dist/vanta.trunk.min";

const VantaBackground = () => {
  const vantaContainerRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    if (!vantaEffectRef.current && vantaContainerRef.current) {
      try {
        vantaEffectRef.current = TRUNK({
          el: vantaContainerRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          backgroundColor: 0x0,
          color: 0x98fb98,
          speed: 2.0,
          spacing: 10.0,
          chaos: 1.0,
        });
      } catch (error) {
        console.error("[VANTA] Initialization error:", error);
      }
    }

    return () => {
      if (vantaEffectRef.current) {
        try {
          vantaEffectRef.current.destroy(); // ✅ Fix: Only destroy if initialized
          vantaEffectRef.current = null;
        } catch (error) {
          console.warn("[VANTA] Cleanup error:", error);
        }
      }
    };
  }, []);

  return <div ref={vantaContainerRef} className="absolute top-0 left-0 w-full h-full -z-10"></div>;
};

export default VantaBackground;
