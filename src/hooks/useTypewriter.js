import { useState, useEffect } from 'react';

export function useTypewriter(
  words = ['Flutter & Kotlin App Builder', 'Full-Stack Systems Architect', 'Founder @ CodeCraft Digital'],
  typeSpeed = 75,
  deleteSpeed = 35,
  pauseDelay = 1800
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[wordIndex % words.length];

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex(prev => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseDelay]);

  return displayText;
}
