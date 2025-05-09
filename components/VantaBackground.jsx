import React, { useEffect, useRef } from "react";
import CLOUDS2 from "vanta/dist/vanta.clouds2.min";
import * as THREE from "three";

const VantaBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = CLOUDS2({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      texturePath: "/assets/noise.png",
      backgroundColor: 0xffffff,
      skyColor: 0xffffff, // Custom sky color
      cloudColor: 0x5a6793, // Custom cloud color
      lightColor: 0xefefef, // Custom light color
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="vanta-bg fixed inset-0"></div>;
};

export default VantaBackground;
