import { useState } from 'react';
import { motion } from 'framer-motion';

interface Gift {
  id: number;
  ic: string;
  n: string;
  s: string;
  tk: boolean;
  gv: string;
}

const initialGifts: Gift[] = [
  { id: 0, ic: '👜', n: 'Bolsa', s: '', tk: false, gv: '' },
  { id: 1, ic: '👚', n: 'Roupas', s: 'Tamanho P', tk: false, gv: '' },
  { id: 2, ic: '👗', n: 'Vestido', s: '', tk: false, gv: '' },
  { id: 3, ic: '👖', n: 'Calça ou Shorts', s: 'Tam. 36 ou 38', tk: false, gv: '' },
  { id: 4, ic: '👠', n: 'Calçado', s: 'Tam. 37 ou 38', tk: false, gv: '' },
  { id: 5, ic: '⌚', n: 'Relógio', s: '', tk: false, gv: '' },
  { id: 6, ic: '💍', n: 'Anel', s: 'Tam. 18 a 20', tk: false, gv: '' },
  { id: 7, ic: '📿', n: 'Pulseira', s: '', tk: false, gv: '' },
  { id: 8, ic: '📿', n: 'Colar', s: '', tk: false, gv: '' },
  { id: 9, ic: '💄', n: 'Maquiagem', s: '', tk: false, gv: '' },
  { id: 10, ic: '🌸', n: 'Perfumaria', s: '', tk: false, gv: '' },
];

const GiftsSection = ({ visible }: { visible: boolean }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [gifts, setGifts] = useState(initialGifts);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Gift | null>(null);
  const [name, setName] = useState('');
  const [success, setSuccess] = useState<{ name: string; gift: string } | null>(null);

  if (!visible) return null;

  const handleConfirm = () => {
    if (!name.trim() || !selected) return;
    setGifts((prev) =>
      prev.map((g) => (g.id === selected.id ? { ...g, tk: true, gv: name.trim() } : g))
    );
    setSuccess({ name: name.trim(), gift: selected.n });
    setSelected(null);
    setName('');
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="py-16 px-6 max-w-[700px] mx-auto text-center"
    >
      <p className="font-display text-[0.65rem] tracking-[0.38em] uppercase text-gold mb-2">Sugestão de Presentes</p>
      <h2 className="font-script text-[clamp(1.9rem,6vw,3rem)] text-foreground leading-tight mb-5">Lista de Presentes</h2>
      <div className="flex items-center gap-3 max-w-[180px] mx-auto mb-10">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, hsl(var(--sp)))' }} />
        <span className="text-gold text-[0.82rem]">✦</span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, hsl(var(--sp)))' }} />
      </div>
      <p className="text-[0.95rem] text-lp mb-7 leading-relaxed">
        Clique para ver os presentes e escolher o que vai dar 🎁
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
        <span>{open ? 'Fechar Lista' : 'Ver Lista de Presentes'}</span>
        <span className={`text-[0.75rem] inline-block transition-transform duration-400 ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      <div
        className="overflow-hidden transition-all duration-700"
        style={{
          maxHeight: open ? '1600px' : '0',
          opacity: open ? 1 : 0,
        }}
      >
        {!selected && !success && (
          <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
            {gifts.map((g) => (
              <div
                key={g.id}
                onClick={() => !g.tk && setSelected(g)}
                className={`rounded-[14px] p-4 text-center relative transition-all duration-200 ${
                  g.tk
                    ? 'opacity-40 cursor-not-allowed'
                    : 'cursor-pointer hover:-translate-y-1'
                }`}
                style={{
                  background: g.tk ? 'rgba(74,26,120,0.18)' : 'rgba(74,26,120,0.18)',
                  border: `2px solid ${g.tk ? 'rgba(200,168,233,0.13)' : 'rgba(200,168,233,0.13)'}`,
                }}
              >
                {g.tk && (
                  <div className="absolute top-2 right-2 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[0.65rem]"
                    style={{ background: 'rgba(150,100,200,0.55)' }}>✓</div>
                )}
                <div className="text-[1.6rem] mb-1">{g.ic}</div>
                <div className="text-[0.88rem] text-ll leading-tight">{g.n}</div>
                {g.s && <div className="text-[0.72rem] text-lp mt-0.5">{g.s}</div>}
                {g.tk && <div className="text-[0.65rem] text-lp italic mt-1">Reservado</div>}
              </div>
            ))}
          </div>
        )}

        {selected && (
          <div
            className="rounded-2xl p-5 text-left"
            style={{ background: 'rgba(74,26,120,0.22)', border: '1px solid rgba(200,168,233,0.18)' }}
          >
            <p className="font-body text-base text-ll mb-4 leading-relaxed">
              Você quer reservar <strong className="text-gold2">{selected.n}</strong>?
              <br />Coloque seu nome para confirmar:
            </p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              maxLength={50}
              className="w-full rounded-lg px-4 py-3 text-foreground font-body text-base outline-none mb-3 transition-colors focus:border-sp"
              style={{
                background: 'rgba(26,5,53,0.52)',
                border: '1px solid rgba(200,168,233,0.22)',
              }}
            />
            <div className="flex gap-2 flex-wrap justify-center">
              <button
                onClick={handleConfirm}
                className="flex-1 min-w-[110px] rounded-full px-5 py-3 text-foreground font-display text-[0.75rem] tracking-[0.14em] uppercase cursor-pointer transition-all hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--mp)), hsl(var(--dp)))',
                  border: '1px solid rgba(200,168,233,0.28)',
                }}
              >
                Confirmar ✓
              </button>
              <button
                onClick={() => { setSelected(null); setName(''); }}
                className="flex-1 min-w-[90px] bg-transparent rounded-full px-5 py-3 text-lp font-display text-[0.75rem] tracking-[0.14em] uppercase cursor-pointer transition-colors hover:border-lp"
                style={{ border: '1px solid rgba(200,168,233,0.18)' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {success && (
          <div className="text-center py-6 px-2">
            <div className="text-[2.4rem] mb-3">🎀</div>
            <p className="font-script text-[1.8rem] text-ll mb-1">{success.name}</p>
            <p className="text-[0.95rem] text-lp leading-relaxed">
              Que presente incrível! Esther vai adorar receber {success.gift.toLowerCase()} de você. Obrigada! 💜
            </p>
            <button
              onClick={() => setSuccess(null)}
              className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 cursor-pointer font-display text-[0.72rem] tracking-[0.18em] uppercase text-ll"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,191,0.38), rgba(74,26,120,0.55))',
                border: '1px solid rgba(200,168,233,0.32)',
              }}
            >
              ← Ver outros
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default GiftsSection;
