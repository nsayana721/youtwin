import React, { useState } from 'react';
import { SendHorizontal, Mic, Paperclip } from 'lucide-react';
import { useRef, useEffect, useCallback } from 'react';

interface ContentChatInputProps {
  onSend: (message: string) => void;
  isProcessing: boolean;
  onStop: () => void;
}

enum RecordingState {
  IDLE,
  RECORDING,
  PROCESSING,
  SUCCESS,
  ERROR
}

export function ContentChatInput({ onSend, isProcessing, onStop }: ContentChatInputProps) {
  const [message, setMessage] = useState('');
  const [recordingState, setRecordingState] = useState<RecordingState>(RecordingState.IDLE);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWaveform = useCallback(() => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    const draw = () => {
      if (recordingState !== RecordingState.RECORDING) return;
      
      analyser.getByteTimeDomainData(dataArray);
      
      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#F75B48';
      ctx.beginPath();
      
      const sliceWidth = canvas.width / dataArray.length;
      let x = 0;
      
      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;
        
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
  }, [recordingState]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      setRecordingState(RecordingState.RECORDING);
      drawWaveform();
    } catch (err) {
      console.error('Failed to start recording:', err);
      setRecordingState(RecordingState.ERROR);
    }
  };

  const stopRecording = async () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    setRecordingState(RecordingState.PROCESSING);
    
    // Simulate processing delay
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      if (success) {
        setMessage('This is a simulated transcription of the recorded audio...');
        setRecordingState(RecordingState.SUCCESS);
      } else {
        setRecordingState(RecordingState.ERROR);
      }
      
      setTimeout(() => {
        setRecordingState(RecordingState.IDLE);
      }, 2000);
    }, 1500);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getRecordingStatusUI = () => {
    switch (recordingState) {
      case RecordingState.RECORDING:
        return (
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 w-64">
            <canvas
              ref={canvasRef}
              className="w-full h-12"
              width={256}
              height={48}
            />
          </div>
        );
      case RecordingState.PROCESSING:
        return (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Processing audio...
          </div>
        );
      case RecordingState.SUCCESS:
        return (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full" />
            Audio transcribed successfully!
          </div>
        );
      case RecordingState.ERROR:
        return (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full" />
            Failed to process audio
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {getRecordingStatusUI()}
      <form onSubmit={handleSubmit} className="flex gap-2 h-10">
        <button
          type="button"
          disabled={isProcessing || recordingState === RecordingState.RECORDING}
          className={`w-10 h-10 rounded-lg transition-colors flex-shrink-0 flex items-center justify-center ${
            isProcessing || recordingState === RecordingState.RECORDING
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-400 hover:text-primary-500 hover:bg-primary-50'
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 13.5V8C14 5.79086 12.2091 4 10 4C7.79086 4 6 5.79086 6 8V13.5C6 17.0899 8.91015 20 12.5 20C16.0899 20 19 17.0899 19 13.5V4H21V13.5C21 18.1944 17.1944 22 12.5 22C7.80558 22 4 18.1944 4 13.5V8C4 4.68629 6.68629 2 10 2C13.3137 2 16 4.68629 16 8V13.5C16 15.433 14.433 17 12.5 17C10.567 17 9 15.433 9 13.5V8H11V13.5C11 14.3284 11.6716 15 12.5 15C13.3284 15 14 14.3284 14 13.5Z" />
          </svg>
        </button>
        <button
          type="button"
          disabled={isProcessing || recordingState === RecordingState.PROCESSING}
          onClick={recordingState === RecordingState.RECORDING ? stopRecording : startRecording}
          className={`w-10 h-10 rounded-lg transition-colors flex-shrink-0 select-none flex items-center justify-center ${
            recordingState === RecordingState.RECORDING
              ? 'text-primary-500 bg-primary-50 hover:bg-primary-100' 
              : isProcessing || recordingState === RecordingState.PROCESSING
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-400 hover:text-primary-500 hover:bg-primary-50'
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.0001 3C10.3432 3 9.00008 4.34315 9.00008 6V12C9.00008 13.6569 10.3432 15 12.0001 15C13.6569 15 15.0001 13.6569 15.0001 12V6C15.0001 4.34315 13.6569 3 12.0001 3ZM12.0001 1C14.7615 1 17.0001 3.23858 17.0001 6V12C17.0001 14.7614 14.7615 17 12.0001 17C9.23865 17 7.00008 14.7614 7.00008 12V6C7.00008 3.23858 9.23865 1 12.0001 1ZM2.19238 13.9615L4.15392 13.5692C4.88321 17.2361 8.11888 20 12.0001 20C15.8813 20 19.1169 17.2361 19.8462 13.5692L21.8078 13.9615C20.8961 18.5452 16.8516 22 12.0001 22C7.14858 22 3.104 18.5452 2.19238 13.9615Z" />
          </svg>
        </button>
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing || recordingState === RecordingState.RECORDING}
            placeholder="Ask a question about this content..."
            className={`w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-10 leading-normal transition-colors ${
              isProcessing || recordingState === RecordingState.RECORDING
                ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                : ''
            }`}
            rows={1}
          />
        </div>
        <button
          type={isProcessing ? 'button' : 'submit'}
          onClick={isProcessing ? onStop : undefined}
          className={`w-10 h-10 rounded-lg transition-colors flex-shrink-0 flex items-center justify-center ${
            isProcessing
              ? 'text-red-500 hover:text-red-600 hover:bg-red-50'
              : 'text-primary-500 hover:text-primary-600 hover:bg-primary-50'
          }`}
          disabled={!isProcessing && !message.trim() && recordingState !== RecordingState.SUCCESS}
        >
          {isProcessing ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM8 8H16V16H8V8Z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558ZM5 4.38249V10.9999H10V12.9999H5V19.6174L18.8499 11.9999L5 4.38249Z" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}