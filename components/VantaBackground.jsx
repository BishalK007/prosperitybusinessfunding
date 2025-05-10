import React, { useEffect, useRef } from "react";
import CELLS from "vanta/dist/vanta.cells.min";
import * as THREE from "three";

const VantaBackground = () => {
    const vantaRef = useRef(null); // Reference to the DOM element
    const vantaEffectRef = useRef(null); // Reference to the Vanta effect instance

    useEffect(() => {
        console.log("Initializing Vanta effect...");
        if (!vantaEffectRef.current) {
            try {
                vantaEffectRef.current = CELLS({
                    el: vantaRef.current,
                    THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    color1: 0x20b1b1,
                    color2: 0x68bd92,
                    // color1: 0x81dbdb,
                    // color2: 0x72ffbb,
                    size: 1.00
                });
                console.log("Vanta effect initialized:", vantaEffectRef.current);
            } catch (error) {
                console.error("Error initializing Vanta effect:", error);
            }
        }

        return () => {
            console.log("Destroying Vanta effect...");
            if (vantaEffectRef.current) {
                try {
                    vantaEffectRef.current.destroy();
                } catch (error) {
                    console.warn("Error during Vanta effect cleanup:", error);
                }
                vantaEffectRef.current = null;
            }
        };
    }, []);

    return <div ref={vantaRef} className="vanta-bg fixed inset-0"></div>;
};

export default VantaBackground;