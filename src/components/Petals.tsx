import { useEffect, useRef } from 'react';

const Petals = ({ count = 12 }: { count?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      const s = 8 + Math.random() * 14;
      p.style.width = s + 'px';
      p.style.height = s * 1.35 + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = 8 + Math.random() * 10 + 's';
      p.style.animationDelay = Math.random() * 12 + 's';
      c.appendChild(p);
    }
    return () => { c.innerHTML = ''; };
  }, [count]);

  return <div ref={containerRef} />;
};

export default Petals;
