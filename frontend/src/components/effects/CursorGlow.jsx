import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function CursorGlow() {
  const ref = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (e) => {
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
      el.style.opacity = '1';
    };

    const hide = () => { el.style.opacity = '0'; };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', hide);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', hide);
    };
  }, []);

  if (!isDark) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-0 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300"
      style={{
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0,232,184,0.06) 0%, rgba(91,141,239,0.03) 40%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
}
