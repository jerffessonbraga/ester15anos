import { motion } from 'framer-motion';

const MessageSection = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="py-16 px-6 max-w-[650px] mx-auto text-center"
    >
      <p className="font-display text-[0.65rem] tracking-[0.38em] uppercase text-gold mb-2">Uma mensagem especial</p>
      <div className="flex items-center gap-3 max-w-[180px] mx-auto mb-10">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, hsl(var(--sp)))' }} />
        <span className="text-gold text-[0.82rem]">✦</span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, hsl(var(--sp)))' }} />
      </div>
      <blockquote className="font-body text-[clamp(1.05rem,2.7vw,1.55rem)] italic font-light text-ll leading-[1.8] mb-7 text-pretty">
        "Quinze anos são a porta de entrada para um mundo de possibilidades. Que cada passo desta nova fase seja iluminado pelo amor, pela alegria e pela graça de Deus."
      </blockquote>
      <div
        className="h-px max-w-[150px] mx-auto mb-5"
        style={{ background: 'linear-gradient(to right, transparent, rgba(124,58,191,0.4), transparent)' }}
      />
      <p className="font-script text-[1.45rem] text-gold2">— Família Cavalcante</p>
    </motion.section>
  );
};

export default MessageSection;
