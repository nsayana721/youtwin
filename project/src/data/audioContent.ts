export interface Subtitle {
  id: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  text: string;
}

export interface AudioContent {
  id: string;
  audioUrl: string;
  duration: number; // in seconds
  subtitles: Subtitle[];
}

export const mockAudioContent: Record<string, AudioContent> = {
  'a1': {
    id: 'a1',
    audioUrl: 'https://example.com/audio/genetics.mp3',
    duration: 1530, // 25:30
    subtitles: [
      {
        id: 's1',
        startTime: 0,
        endTime: 5,
        text: 'Welcome to this lecture on genetic inheritance.'
      },
      {
        id: 's2',
        startTime: 5,
        endTime: 12,
        text: 'Today, we\'ll explore how traits are passed from parents to offspring through genes.'
      },
      {
        id: 's3',
        startTime: 12,
        endTime: 20,
        text: 'Genes are segments of DNA that code for specific proteins, which determine our traits.'
      },
      // Add more subtitles...
    ]
  },
  'a3': {
    id: 'a3',
    audioUrl: 'https://example.com/audio/cell-biology.mp3',
    duration: 1185, // 19:45
    subtitles: [
      {
        id: 's1',
        startTime: 0,
        endTime: 6,
        text: 'Let\'s begin our exploration of cell biology and cellular structures.'
      },
      {
        id: 's2',
        startTime: 6,
        endTime: 15,
        text: 'The cell is the fundamental unit of life, and understanding its components is crucial.'
      },
      {
        id: 's3',
        startTime: 15,
        endTime: 25,
        text: 'We\'ll start by examining the cell membrane, which acts as a selective barrier.'
      },
      // Add more subtitles...
    ]
  }
};