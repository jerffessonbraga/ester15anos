import { useEffect, useRef } from 'react';

const StarsCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    if (!cx) return;

    let stars: { x: number; y: number; r: number; a: number; da: number }[] = [];
    let animId: number;

    const init = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      stars = Array.from({ length: 180 }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.008,
      }));
    };

    const draw = () => {
      cx.clearRect(0, 0, cv.width, cv.height);
      for (const s of stars) {
        s.a += s.da;
        if (s.a > 1 || s.a < 0.15) s.da *= -1;
        cx.beginPath();
        cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        cx.fillStyle = `rgba(220,200,245,${s.a})`;
        cx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return <canvas ref={canvasRef} id="stars" />;
};

export default StarsCanvas;
