import { useState, useEffect, useCallback, useRef } from 'react';
import { storiesData } from '../data/storiesData';

export function useStoryViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const duration = 4500;
  const step = 50;

  const closeStory = useCallback(() => {
    setIsOpen(false);
    setProgress(0);
    clearInterval(timerRef.current);
  }, []);

  const openStory = useCallback((startIndex = 0) => {
    setCurrentIdx(startIndex);
    setProgress(0);
    setIsOpen(true);
  }, []);

  const nextSlide = useCallback(() => {
    setProgress(0);
    setCurrentIdx(prev => {
      if (prev + 1 < storiesData.length) {
        return prev + 1;
      }
      closeStory();
      return prev;
    });
  }, [closeStory]);

  const prevSlide = useCallback(() => {
    setProgress(0);
    setCurrentIdx(prev => Math.max(0, prev - 1));
  }, []);

  useEffect(() => {
    if (!isOpen || isPaused) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (step / duration) * 100;
      });
    }, step);

    return () => clearInterval(timerRef.current);
  }, [isOpen, isPaused, nextSlide]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeStory();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeStory]);

  return {
    isOpen,
    currentIdx,
    currentSlide: storiesData[currentIdx] || storiesData[0],
    stories: storiesData,
    progress,
    openStory,
    closeStory,
    nextSlide,
    prevSlide,
    setIsPaused
  };
}
