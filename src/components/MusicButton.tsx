interface MusicButtonProps {
  playing: boolean;
  onToggle: () => void;
  visible: boolean;
}

const MusicButton = ({ playing, onToggle, visible }: MusicButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-5 right-5 z-[200] flex items-center gap-2 backdrop-blur-xl rounded-full px-4 py-2 cursor-pointer font-display text-[0.72rem] tracking-[0.1em] text-ll transition-all duration-250 hover:scale-[1.04] ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        background: 'rgba(74,26,120,0.82)',
        border: '1px solid rgba(200,168,233,0.28)',
      }}
    >
      {playing ? (
        <span className="flex items-center gap-[2px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[3px] bg-ll rounded-full"
              style={{
                animation: `equalizerBar 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                height: '4px',
              }}
            />
          ))}
        </span>
      ) : (
        <span style={{ animation: 'nd 1.4s ease-in-out infinite', fontSize: '14px' }}>♫</span>
      )}
      <span>{playing ? 'Pausar' : 'Tocar Música'}</span>
    </button>
  );
};

export default MusicButton;
