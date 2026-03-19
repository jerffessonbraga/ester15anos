import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import photoImg from '@/assets/photo.jpg';

const PhotoSection = ({ visible }: { visible: boolean }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  if (!visible) return null;

  return (
    <section
      ref={ref}
      className="py-20 px-6 flex flex-col items-center"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(74,26,120,0.08), transparent)' }}
    >
      <div className="relative" style={{ width: 'min(280px, 74vw)', perspective: '900px' }}>
        {/* Animated border ring */}
        <div
          className="absolute -inset-1 rounded-[20px] z-0"
          style={{
            background: 'linear-gradient(60deg, hsl(var(--gold)), hsl(var(--sp)), hsl(var(--gold2)), hsl(var(--lp)), hsl(var(--gold)))',
            backgroundSize: '300% 300%',
            animation: 'bsh 4s ease infinite',
            filter: 'blur(3px)',
            opacity: 0.88,
          }}
        />

        {/* Photo with improved Soft Reveal & Scale animation */}
        <motion.div
          className="relative z-[1] overflow-hidden rounded-2xl"
          initial={inView ? undefined : { opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.3,
          }}
          style={{
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3), 0 14px 45px rgba(26,5,53,0.55)',
            outline: '1px solid rgba(255,255,255,0.05)',
            outlineOffset: '-1px',
          }}
        >
          <motion.img
            src={photoImg}
            alt="Esther"
            className="w-full block"
            style={{ borderRadius: '16px' }}
            animate={inView ? {
              scale: [1, 1.01, 1],
              y: [0, -5, 0],
            } : undefined}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2.5,
            }}
          />
        </motion.div>

        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 z-[2] rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)',
            backgroundSize: '200% 100%',
            animation: 'shs 3.5s ease-in-out infinite',
          }}
        />

        {/* Sparkle particles */}
        {[
          { top: '-13px', left: '9%', delay: '0s', emoji: '✨' },
          { top: '-13px', right: '11%', delay: '0.9s', emoji: '⭐', size: '13px' },
          { bottom: '14%', left: '-18px', delay: '1.5s', emoji: '✦' },
          { bottom: '24%', right: '-18px', delay: '0.4s', emoji: '🌸', size: '13px' },
          { top: '32%', left: '-17px', delay: '2s', emoji: '💜', size: '12px' },
        ].map((sp, i) => (
          <span
            key={i}
            className="absolute pointer-events-none z-[3] text-[15px]"
            style={{
              ...sp,
              fontSize: sp.size || '15px',
              animation: `spp 2.5s ease-in-out infinite`,
              animationDelay: sp.delay,
            }}
          >
            {sp.emoji}
          </span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-7 font-script text-[clamp(1.8rem,5.5vw,2.6rem)] text-ll"
        style={{ textShadow: '0 2px 14px rgba(124,58,191,0.35)' }}
      >
        Esther Jorge Cavalcante
      </motion.p>
    </section>
  );
};

export default PhotoSection;
