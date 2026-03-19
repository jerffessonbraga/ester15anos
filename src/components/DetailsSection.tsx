import { motion } from 'framer-motion';

const SectionHeader = ({ tag, title }: { tag: string; title: string }) => (
  <>
    <p className="font-display text-[0.65rem] tracking-[0.38em] uppercase text-gold mb-2">{tag}</p>
    <h2 className="font-script text-[clamp(2rem,6.5vw,3.5rem)] text-foreground leading-tight mb-5">{title}</h2>
    <div className="flex items-center gap-3 max-w-[180px] mx-auto mb-10">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, hsl(var(--sp)))' }} />
      <span className="text-gold text-[0.82rem]">✦</span>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, hsl(var(--sp)))' }} />
    </div>
  </>
);

const DetailsSection = ({ visible }: { visible: boolean }) => {

  if (!visible) return null;

  const cards = [
    { ic: '📅', t: 'Data', v: '26 de Junho', s: 'Sexta-feira, 2026' },
    { ic: '🕖', t: 'Horário', v: '19h30', s: 'Pontualmente' },
    { ic: '🌹', t: 'Local', v: 'Espaço North Buffet', s: 'Av. Mister Hull, 4758\nAntônio Bezerra · CE' },
    { ic: '👗', t: 'Traje', v: 'Traje Festivo', s: 'Tons lilás & dourado' },
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="py-16 px-6 max-w-[860px] mx-auto text-center"
    >
      <SectionHeader tag="Detalhes da Festa" title="Uma noite inesquecível" />
      <div className="flex flex-wrap gap-4 justify-center">
        {cards.map((c) => (
          <div
            key={c.t}
            className="backdrop-blur-lg rounded-[18px] p-5 text-center flex-1 min-w-[160px] max-w-[200px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(124,58,191,0.3)]"
            style={{
              background: 'rgba(74,26,120,0.2)',
              border: '1px solid rgba(200,168,233,0.16)',
            }}
          >
            <div className="text-[1.6rem] mb-2">{c.ic}</div>
            <div className="font-display text-[0.58rem] tracking-[0.2em] uppercase text-gold mb-1">{c.t}</div>
            <div className="text-base font-semibold text-foreground leading-tight">{c.v}</div>
            <div className="text-[0.82rem] text-lp mt-0.5 whitespace-pre-line">{c.s}</div>
          </div>
        ))}
      </div>
      <div className="mt-7">
        <a
          href="https://maps.google.com/?q=Av+Mister+Hull+4758+Antonio+Bezerra+Fortaleza+CE"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 backdrop-blur-lg rounded-full px-6 py-3 text-ll font-display text-[0.75rem] tracking-[0.12em] no-underline transition-all hover:-translate-y-0.5"
          style={{
            background: 'rgba(74,26,120,0.32)',
            border: '1px solid rgba(200,168,233,0.22)',
          }}
        >
          📍 Abrir no Maps
        </a>
      </div>
    </motion.section>
  );
};

export default DetailsSection;
