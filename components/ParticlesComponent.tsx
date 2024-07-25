'use client';
import { useEffect, useMemo, useState } from 'react';
import { loadSlim } from '@tsparticles/slim';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { Engine, IOptions, RecursivePartial } from '@tsparticles/engine'; // Ensure you have the "@tsparticles/slim" package installed.
import { useTheme } from 'next-themes';

type ParticlesComponentProps = {
  id?: string;
};

const ParticlesComponent = ({ id }: ParticlesComponentProps) => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const initParticles = async (engine: Engine) => {
      await loadSlim(engine);
      setInit(true);
    };

    initParticlesEngine(initParticles).then(() => setInit(true));
  }, []);

  const options: RecursivePartial<IOptions> | undefined = useMemo(
    () => ({
      background: {
        color: {
          value: theme === 'dark' ? '#3f3f46' : '#e4e4e7',
        },
      },
      fpsLimit: 100,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'repulse',
          },
          onHover: {
            enable: true,
            mode: 'grab',
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 15,
          },
          grab: {
            distance: 150,
          },
        },
      },
      particles: {
        color: {
          value: ['#f92386', '#eaad20'],
        },
        links: {
          color: {
            value: ['#f92386', '#eaad20'],
          },
          distance: 150,
          enable: true,
          opacity: 0.6,
          width: 1,
          warp: {
            enable: true,
            gradient: {
              angle: 45,
              colors: [
                { stop: 0, value: '#ed7ed5' },
                { stop: 0.5, value: '#eaad20' },
                { stop: 1, value: '#f92386' },
              ],
            },
          },
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 180,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: ['circle', 'image'],
          options: {
            image: [
              {
                src: 'https://dealkh.istad.co/logo.png',
                width: 100,
                height: 100,
              },
            ],
          },
        },
        size: {
          value: { min: 3, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [theme] // Add theme to the dependency array
  );

  return <>{init && <Particles id={id} options={options} />}</>;
};

export default ParticlesComponent;
