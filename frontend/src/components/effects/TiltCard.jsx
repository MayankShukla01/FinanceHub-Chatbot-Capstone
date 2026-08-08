import { useRef, useState } from 'react';

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setStyle({
      transform: `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleLeave = () => {
    setStyle({
      transform: 'perspective(600px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-out',
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}
