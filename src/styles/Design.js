import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import img from "../assets/Bag.png";

const Design = () => {
  const particlesInit = useCallback(async (engine) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["d402029a", "#ffffff", "#006eeb9a"],
          },
          links: {
            color: "#d402029a",
            distance: 150,
            enable: true,
            opacity: 0,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "bottom",
            enable: true,
            outModes: {
              bottom: "out",
              left: "bounce",
              right: "bounce",
              top: "out",
            },
            random: false,
            speed: 4,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 25,
          },
          opacity: {
            value: 0.1,
          },
          shape: {
            image: { src: img },
            type: ["image", "circle"],
          },

          size: {
            value: { min: 20, max: 40 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default Design;
