import React, { useState, useRef, useEffect } from 'react';
import { Mic, Settings } from 'lucide-react';

interface VoiceChatInterfaceProps {
  tutorName: string;
  tutorId: string;
  subject: string;
}

enum VoiceState {
  IDLE,
  LISTENING,
  PROCESSING,
  RESPONDING
}

export function VoiceChatInterface({ tutorName, tutorId, subject }: VoiceChatInterfaceProps) {
  const [mode, setMode] = useState<'continuous' | 'press'>('continuous');
  const [voiceState, setVoiceState] = useState<VoiceState>(VoiceState.IDLE);
  const [transcription, setTranscription] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();
  const silenceTimeoutRef = useRef<NodeJS.Timeout>();
  const audioChunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const drawWaveform = () => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (voiceState !== VoiceState.LISTENING) return;

      analyser.getByteTimeDomainData(dataArray);

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#4F46E5');
      gradient.addColorStop(1, '#E11D48');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waveform
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * (canvas.height / 2);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        audioChunksRef.current = [];
        
        // Simulate processing delay
        setVoiceState(VoiceState.PROCESSING);
        setTimeout(() => {
          setVoiceState(VoiceState.RESPONDING);
          setTranscription('This is a simulated transcription of what was spoken...');
          
          // Simulate AI response with audio
          if (audioRef.current) {
            audioRef.current.src = 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav';
            audioRef.current.play();
            
            audioRef.current.onended = () => {
              setVoiceState(VoiceState.IDLE);
              setTranscription('');
            };
          }
        }, 1500);
      };

      if (mode === 'continuous') {
        // Reset silence detection on new audio
        if (silenceTimeoutRef.current) {
          clearTimeout(silenceTimeoutRef.current);
        }
      }

      mediaRecorderRef.current.start();
      setVoiceState(VoiceState.LISTENING);
      drawWaveform();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && voiceState === VoiceState.LISTENING) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());      
    }
  };

  const handleMouseDown = () => {
    if (mode === 'press' && voiceState === VoiceState.IDLE) {
      startRecording();
    }
  };

  const handleMouseUp = () => {
    if (mode === 'press' && voiceState === VoiceState.LISTENING) {
      stopRecording();
    }
  };

  const handleClick = () => {
    if (mode === 'continuous') {
      if (voiceState === VoiceState.IDLE) {
        startRecording();
      } else if (voiceState === VoiceState.LISTENING) {
        stopRecording();
      }
    }
  };

  const getStateDisplay = () => {
    switch (voiceState) {
      case VoiceState.LISTENING:
        return (
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="w-full h-32 rounded-2xl"
              width={800}
              height={128}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-lg font-medium">Listening...</p>
            </div>
          </div>
        );
      case VoiceState.PROCESSING:
        return (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-600 to-rose-600 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm animate-ping" />
              </div>
            </div>
            <p className="text-white text-lg font-medium">Processing...</p>
          </div>
        );
      case VoiceState.RESPONDING:
        return (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-600 to-rose-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm" />
              </div>
            </div>
            <p className="text-white text-lg font-medium">{transcription}</p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-600 to-rose-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm" />
              </div>
            </div>
            <p className="text-white text-lg font-medium">Tap the microphone to start</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-900">
      <audio ref={audioRef} className="hidden" />
      
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setMode(mode === 'continuous' ? 'press' : 'continuous')}
          className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>{mode === 'continuous' ? 'Continuous Mode' : 'Press to Talk'}</span>
        </button>
      </div>

      <div className="flex-1 p-8">
        {getStateDisplay()}
      </div>

      <div className="p-8 flex justify-center">
        <button
          onClick={mode === 'continuous' ? handleClick : undefined}
          onMouseDown={mode === 'press' ? handleMouseDown : undefined}
          onMouseUp={mode === 'press' ? handleMouseUp : undefined}
          onMouseLeave={mode === 'press' && voiceState === VoiceState.LISTENING ? handleMouseUp : undefined}
          disabled={voiceState === VoiceState.PROCESSING || voiceState === VoiceState.RESPONDING}
          className={`relative p-6 rounded-full transition-all ${
            voiceState === VoiceState.LISTENING
              ? 'bg-rose-600 hover:bg-rose-700 scale-110'
              : voiceState === VoiceState.PROCESSING || voiceState === VoiceState.RESPONDING
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {voiceState === VoiceState.LISTENING && (
            <span className="absolute inset-0 rounded-full bg-rose-600 animate-ping" />
          )}
          <Mic className={`w-8 h-8 text-white ${
            voiceState === VoiceState.LISTENING ? 'animate-pulse' : ''
          }`} />
        </button>
      </div>
      <div className="pb-4 text-center text-white/60 text-sm">
        {mode === 'continuous' ? 'Click to start/stop recording' : 'Press and hold to record'}
      </div>
    </div>
  );
}