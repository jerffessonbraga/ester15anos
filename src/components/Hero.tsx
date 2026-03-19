import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImg from '@/assets/logo.jpg';

const Hero = ({ visible }: { visible: boolean }) => {
  const [countdown, setCountdown] = useState({ d: '--', h: '--', m: '--', s: '--' });

  useEffect(() => {
    const target = new Date('2026-06-26T19:30:00-03:00').getTime();
    const tick = () => {
      const df = target - Date.now();
      if (df <= 0) return;
      setCountdown({
        d: String(Math.floor(df / 86400000)).padStart(2, '0'),
        h: String(Math.floor((df % 86400000) / 3600000)).padStart(2, '0'),
        m: String(Math.floor((df % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((df % 60000) / 1000)).padStart(2, '0'),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center py-20 px-6 text-center"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,191,0.2) 0%, transparent 60%)' }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="font-display text-[0.7rem] tracking-[0.45em] uppercase text-lp mb-5"
      >
        Você está convidada para celebrar
      </motion.p>

      <motion.img
        src={logoImg} alt="Logo"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
        className="mb-6"
        style={{
          width: 'min(155px, 40vw)',
          filter: 'drop-shadow(0 5px 20px rgba(124,58,191,0.5))',
          animation: 'lf 4s ease-in-out 1.2s infinite',
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9 }}
        className="font-script text-[clamp(4rem,14vw,8.5rem)] text-foreground leading-[0.95] text-balance"
        style={{ textShadow: '0 0 45px rgba(200,168,233,0.4), 0 3px 20px rgba(26,5,53,0.5)' }}
      >
        Esther
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.9 }}
        className="font-body text-[clamp(5rem,18vw,11rem)] font-light leading-none tracking-tight"
        style={{
          background: 'linear-gradient(140deg, hsl(var(--gold2)), hsl(var(--gold)) 45%, #a07830)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        15
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.78, duration: 0.8 }}
        className="font-script text-[clamp(1.5rem,5vw,3rem)] text-gold2 mb-8"
      >
        anos
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="w-[210px] h-px mx-auto mb-7"
        style={{ background: 'linear-gradient(to right, transparent, hsl(var(--sp)), transparent)' }}
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="font-display text-[clamp(0.8rem,2.4vw,1rem)] tracking-[0.12em] text-ll mb-8"
      >
        26 de Junho de 2026 &nbsp;·&nbsp; 19h30
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="flex gap-3 justify-center flex-wrap"
      >
        {[
          { v: countdown.d, l: 'Dias' },
          { v: countdown.h, l: 'Horas' },
          { v: countdown.m, l: 'Min' },
          { v: countdown.s, l: 'Seg' },
        ].map((c) => (
          <div
            key={c.l}
            className="flex flex-col items-center backdrop-blur-lg rounded-xl px-4 py-3 min-w-[65px]"
            style={{
              background: 'rgba(74,26,120,0.32)',
              border: '1px solid rgba(200,168,233,0.18)',
            }}
          >
            <span className="font-body text-[2.1rem] font-light text-foreground leading-none">{c.v}</span>
            <span className="text-[0.58rem] tracking-[0.22em] uppercase text-lp mt-1">{c.l}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-10 flex flex-col items-center gap-1"
      >
        <span className="font-display text-[0.62rem] tracking-[0.28em] uppercase" style={{ color: 'rgba(200,168,233,0.38)' }}>
          Role para baixo
        </span>
        <span style={{ animation: 'ab 1.6s ease-in-out infinite', color: 'rgba(200,168,233,0.38)' }}>↓</span>
      </motion.div>
    </section>
  );
};

export default Hero;
