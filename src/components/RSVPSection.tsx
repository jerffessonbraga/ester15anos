import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const RSVPSection = ({ visible }: { visible: boolean }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState<{ name: string; attending: boolean } | null>(null);
  const [name, setName] = useState('');
  const [attending, setAttending] = useState(true);

  if (!visible) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitted({ name: name.trim(), attending });
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="py-16 px-6 max-w-[500px] mx-auto text-center pb-24"
    >
      <p className="font-display text-[0.65rem] tracking-[0.38em] uppercase text-gold mb-2">Confirme sua presença</p>
      <h2 className="font-script text-[clamp(1.9rem,6.5vw,3rem)] text-foreground leading-tight mb-5">RSVP</h2>
      <div className="flex items-center gap-3 max-w-[180px] mx-auto mb-10">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, hsl(var(--sp)))' }} />
        <span className="text-gold text-[0.82rem]">✦</span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, hsl(var(--sp)))' }} />
      </div>
      <p className="text-[0.95rem] text-lp mb-7 leading-relaxed text-pretty">
        Confirme até <strong className="text-gold2">19 de Junho de 2026</strong>.
      </p>

      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-full px-7 py-3 cursor-pointer font-display text-[0.78rem] tracking-[0.18em] uppercase text-ll transition-all duration-300 hover:-translate-y-0.5 mb-7"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,191,0.38), rgba(74,26,120,0.55))',
          border: '1px solid rgba(200,168,233,0.32)',
          boxShadow: '0 3px 18px rgba(74,26,120,0.38)',
        }}
      >
        <span>{open ? 'Fechar' : 'Confirmar Presença'}</span>
        <span className={`text-[0.75rem] inline-block transition-transform duration-400 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      <div
        className="backdrop-blur-xl rounded-[26px] text-left overflow-hidden transition-all duration-700"
        style={{
          background: 'rgba(74,26,120,0.26)',
          border: '1px solid rgba(200,168,233,0.2)',
          maxHeight: open ? '500px' : '0',
          opacity: open ? 1 : 0,
          padding: open ? '2.3rem' : '0 2.3rem',
        }}
      >
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="font-display text-[0.62rem] tracking-[0.2em] uppercase text-gold block mb-1">Seu nome</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como devemos te chamar?"
                required
                className="w-full rounded-lg px-4 py-3 text-foreground font-body text-base outline-none transition-colors focus:border-sp"
                style={{
                  background: 'rgba(26,5,53,0.52)',
                  border: '1px solid rgba(200,168,233,0.22)',
                }}
              />
            </div>
            <div>
              <label className="font-display text-[0.62rem] tracking-[0.2em] uppercase text-gold block mb-1">Você vai comparecer?</label>
              {[
                { val: true, label: 'Sim, estarei lá! 🥂' },
                { val: false, label: 'Infelizmente não poderei ir' },
              ].map((opt) => (
                <label
                  key={String(opt.val)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 cursor-pointer font-body text-base text-ll transition-all mb-1"
                  style={{
                    background: attending === opt.val ? 'rgba(124,58,191,0.25)' : 'rgba(26,5,53,0.38)',
                    border: `1px solid ${attending === opt.val ? 'rgba(200,168,233,0.42)' : 'rgba(200,168,233,0.16)'}`,
                  }}
                >
                  <input
                    type="radio"
                    name="att"
                    checked={attending === opt.val}
                    onChange={() => setAttending(opt.val)}
                    className="accent-sp"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            <button
              type="submit"
              className="w-full rounded-full px-8 py-3 text-foreground font-display text-[0.82rem] tracking-[0.15em] uppercase cursor-pointer transition-all hover:-translate-y-0.5 mt-1"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--mp)), hsl(var(--dp)))',
                border: '1px solid rgba(200,168,233,0.28)',
                boxShadow: '0 3px 18px rgba(74,26,120,0.42)',
              }}
            >
              Confirmar
            </button>
          </form>
        ) : (
          <div className="text-center py-5 px-2">
            <div className="text-[2.8rem] mb-4">🌸</div>
            <p className="font-script text-[1.9rem] text-ll mb-1">{submitted.name}</p>
            <p className="text-[0.95rem] text-lp leading-relaxed">
              {submitted.attending
                ? 'Mal podemos esperar para celebrar com você! 💕'
                : 'Sentiremos sua falta. Muito obrigada por avisar!'}
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default RSVPSection;
