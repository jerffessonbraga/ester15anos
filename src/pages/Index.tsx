import { useState, useRef, useCallback } from 'react';
import StarsCanvas from '@/components/StarsCanvas';
import Petals from '@/components/Petals';
import EnvelopeOverlay from '@/components/EnvelopeOverlay';
import MusicButton from '@/components/MusicButton';
import Hero from '@/components/Hero';
import PhotoSection from '@/components/PhotoSection';
import DetailsSection from '@/components/DetailsSection';
import GiftsSection from '@/components/GiftsSection';
import MessageSection from '@/components/MessageSection';
import RSVPSection from '@/components/RSVPSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/musica.mp3');
      audioRef.current.loop = true;
    }
    const audio = audioRef.current;
    audio.volume = 0;
    audio.play().then(() => {
      setPlaying(true);
      // Smooth fade-in
      let vol = 0;
      const interval = setInterval(() => {
        if (vol < 0.6) {
          vol = Math.min(vol + 0.05, 0.6);
          audio.volume = vol;
        } else {
          clearInterval(interval);
        }
      }, 100);
    }).catch(() => {
      // Autoplay blocked, user can use music button
    });
  }, []);

  const handleEnvelopeOpen = useCallback(() => {
    setStarted(true);
    startMusic();
  }, [startMusic]);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/musica.mp3');
      audioRef.current.loop = true;
    }
    const audio = audioRef.current;
    if (!playing) {
      audio.volume = 0.6;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, [playing]);

  return (
    <div className="relative">
      <StarsCanvas />
      <Petals count={12} />

      <EnvelopeOverlay onOpen={handleEnvelopeOpen} />

      <MusicButton playing={playing} onToggle={toggleMusic} visible={started} />

      <div
        className="relative z-10 transition-opacity duration-[850ms] delay-150"
        style={{ opacity: started ? 1 : 0, pointerEvents: started ? 'auto' : 'none' }}
      >
        <Petals count={8} />
        <Hero visible={started} />
        <PhotoSection visible={started} />
        <DetailsSection visible={started} />
        <GiftsSection visible={started} />
        <MessageSection visible={started} />
        <RSVPSection visible={started} />
        <Footer visible={started} />
      </div>
    </div>
  );
};

export default Index;
