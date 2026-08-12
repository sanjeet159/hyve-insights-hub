import React, { useState, useRef, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Play, Pause, Volume2, Loader2, FastForward, Rewind, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioVoiceoverProps {
  content: string;
  title: string;
}

const AudioVoiceover: React.FC<AudioVoiceoverProps> = ({ content, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Strip HTML from content for a cleaner speech input
  const cleanContent = content.replace(/<[^>]*>?/gm, ' ').substring(0, 4000);

  const generateAudio = async () => {
    if (audioUrl) {
      togglePlay();
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      console.log('Generating audio for:', title);
      const response = await fetch('https://api.lovable.dev/v1/ai/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + ((window as any).LOVABLE_API_KEY || 'lovable')
        },
        body: JSON.stringify({
          text: `Now listening to: ${title}. ${cleanContent}`,
          voice: 'alloy',
          model: 'tts-1'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Audio API error:', response.status, errorData);
        throw new Error(errorData.message || `Failed to generate audio (${response.status})`);
      }

      const blob = await response.blob();
      console.log('Generated blob size:', blob.size);
      if (blob.size < 100) throw new Error('Generated audio is too small/invalid');
      
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error: any) {
      console.error('Audio generation failed:', error);
      setError(error.message || 'Connection error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.error("Playback failed:", e);
          setError("Playback failed. Please try again.");
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current && duration > 0) {
      const newTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play().catch(e => {
        console.error("Initial playback failed:", e);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, [audioUrl]);

  return (
    <div className="my-8 w-full rounded-2xl border border-primary/20 bg-gradient-to-br from-accent/40 to-background p-6 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Volume2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-foreground">Listen to this article</h4>
              {error ? (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {error}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">AI-generated voiceover</p>
              )}
            </div>
          </div>
          {!audioUrl ? (
            <button
              onClick={generateAudio}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 fill-current" />
                  {error ? 'Try Again' : 'Play Audio'}
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button 
                onClick={() => skip(-10)}
                className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                title="Rewind 10s"
              >
                <Rewind className="h-4 w-4" />
              </button>
              <button
                onClick={togglePlay}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105"
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
              </button>
              <button 
                onClick={() => skip(10)}
                className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                title="Forward 10s"
              >
                <FastForward className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {audioUrl && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-col gap-2 pt-2"
          >
            <Slider.Root
              className="relative flex h-5 w-full touch-none select-none items-center"
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={handleSliderChange}
            >
              <Slider.Track className="relative h-1.5 grow rounded-full bg-muted">
                <Slider.Range className="absolute h-full rounded-full bg-primary" />
              </Slider.Track>
              <Slider.Thumb
                className="block h-4 w-4 rounded-full border-2 border-primary bg-background shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Progress"
              />
            </Slider.Root>
            <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground tabular-nums">
              <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AudioVoiceover;