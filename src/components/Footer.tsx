const Footer = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <footer
      className="py-9 px-6 text-center"
      style={{
        background: 'rgba(10,1,24,0.88)',
        borderTop: '1px solid rgba(200,168,233,0.09)',
      }}
    >
      <p className="font-script text-[1.5rem]" style={{ color: 'rgba(200,168,233,0.52)' }}>
        Esther Jorge Cavalcante
      </p>
      <p className="font-display text-[0.65rem] tracking-[0.22em] uppercase" style={{ color: 'rgba(200,168,233,0.2)' }}>
        Festa de 15 Anos · 2026
      </p>
    </footer>
  );
};

export default Footer;
