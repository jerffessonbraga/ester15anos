import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '@/assets/logo.jpg';

interface EnvelopeOverlayProps {
  onOpen: () => void;
}

const EnvelopeOverlay = ({ onOpen }: EnvelopeOverlayProps) => {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'gone'>('closed');
  const sealRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback(() => {
    if (phase !== 'closed') return;
    setPhase('opening');
    // After animation, trigger parent
    setTimeout(() => {
      setPhase('gone');
      onOpen();
    }, 1400);
  }, [phase, onOpen]);

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at 50% 35%, #3d1268 0%, #180430 65%, #0a0118 100%)',
          }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9 }}
        >
          <div
            className="relative cursor-pointer transition-transform duration-250 hover:scale-[1.025]"
            style={{
              width: 'min(360px, 88vw)',
              filter: 'drop-shadow(0 20px 60px rgba(124,58,191,0.6))',
            }}
            onClick={handleOpen}
          >
            {/* Envelope body */}
            <div
              className="w-full relative overflow-hidden"
              style={{
                paddingTop: '60%',
                background: 'linear-gradient(155deg, #6b2fa0, #8b3fc8 45%, #5a2085)',
                borderRadius: '8px 8px 14px 14px',
                border: '1px solid rgba(200,168,233,0.3)',
              }}
            >
              {/* Flap */}
              <div
                className="absolute top-0 left-0 right-0 z-10"
                style={{
                  height: 0,
                  borderLeft: 'min(180px, 44vw) solid transparent',
                  borderRight: 'min(180px, 44vw) solid transparent',
                  borderTop: 'min(116px, 28.5vw) solid #8040c0',
                  transformOrigin: 'top center',
                  transition: 'transform 0.95s cubic-bezier(0.4,0,0.2,1)',
                  transform: phase === 'opening' ? 'rotateX(180deg)' : 'none',
                }}
              />
              {/* Bottom folds */}
              <div
                className="absolute bottom-0 left-0"
                style={{
                  width: 0, height: 0,
                  borderBottom: 'min(84px, 20.5vw) solid rgba(0,0,0,0.17)',
                  borderRight: 'min(180px, 44vw) solid transparent',
                }}
              />
              <div
                className="absolute bottom-0 right-0"
                style={{
                  width: 0, height: 0,
                  borderBottom: 'min(84px, 20.5vw) solid rgba(0,0,0,0.17)',
                  borderLeft: 'min(180px, 44vw) solid transparent',
                }}
              />
              {/* Peek card */}
              <div
                className="absolute left-1/2 flex items-center justify-center z-[4]"
                style={{
                  bottom: '8px',
                  transform: phase === 'opening'
                    ? 'translateX(-50%) translateY(-22%)'
                    : 'translateX(-50%) translateY(106%)',
                  width: '86%',
                  background: 'linear-gradient(155deg, #f5ecfe, #e2cff7)',
                  borderRadius: '7px',
                  height: 'min(100px, 25vw)',
                  transition: 'transform 0.95s cubic-bezier(0.4,0,0.2,1) 0.2s',
                  boxShadow: '0 -5px 20px rgba(100,40,180,0.3)',
                }}
              >
                <span className="font-script text-[clamp(1.3rem,4.5vw,2rem)] text-[#5b2d8e] text-center px-4">
                  Você está convidada ✨
                </span>
              </div>
              {/* Seal */}
              <div
                ref={sealRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center z-[5] overflow-hidden"
                style={{
                  width: 'min(110px, 27vw)',
                  height: 'min(110px, 27vw)',
                  background: 'radial-gradient(circle at 35% 30%, hsl(var(--gold2)), hsl(var(--gold)) 55%, #906820)',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
                  animation: 'sPulse 3s ease-in-out infinite',
                  transition: 'opacity 0.45s',
                  opacity: phase === 'opening' ? 0 : 1,
                }}
              >
                <img src={logoImg} alt="Selo" className="w-[86%] h-[86%] object-contain" />
              </div>
            </div>
          </div>
          <p
            className="mt-8 font-display text-[0.7rem] tracking-[0.35em] uppercase"
            style={{
              color: 'rgba(200,168,233,0.6)',
              animation: 'blink 2s ease-in-out infinite',
            }}
          >
            Toque para abrir ✦
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeOverlay;
