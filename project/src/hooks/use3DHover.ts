import { useState, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function use3DHover(intensity: number = 15) {
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.3s ease-out',
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { currentTarget, clientX, clientY } = e;
      const { left, top, width, height } = currentTarget.getBoundingClientRect();

      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      const rotateX = (0.5 - y) * intensity;
      const rotateY = (x - 0.5) * intensity;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      });
    },
    [intensity]
  );

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.3s ease-out',
    });
  }, []);

  return { style, onMouseMove, onMouseLeave };
}