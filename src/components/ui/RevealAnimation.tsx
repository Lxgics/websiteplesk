
import { useRef, useEffect, ReactNode } from 'react';

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'blur';
type AnimationDistance = 'sm' | 'md' | 'lg';

interface RevealAnimationProps {
  children: ReactNode;
  direction?: AnimationDirection;
  distance?: AnimationDistance;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const RevealAnimation = ({ 
  children, 
  direction = 'up', 
  distance = 'md', 
  delay = 0, 
  duration = 0.7, 
  threshold = 0.1,
  className = '',
}: RevealAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  const getDistanceValue = (dist: AnimationDistance) => {
    const values = {
      sm: '10px',
      md: '20px',
      lg: '30px',
    };
    return values[dist];
  };

  const getInitialStyles = () => {
    const baseStyles = {
      opacity: '0',
      transition: `transform ${duration}s ease-out ${delay}s, opacity ${duration}s ease-out ${delay}s`,
    };

    const distanceValue = getDistanceValue(distance);

    switch (direction) {
      case 'up':
        return { ...baseStyles, transform: `translateY(${distanceValue})` };
      case 'down':
        return { ...baseStyles, transform: `translateY(-${distanceValue})` };
      case 'left':
        return { ...baseStyles, transform: `translateX(${distanceValue})` };
      case 'right':
        return { ...baseStyles, transform: `translateX(-${distanceValue})` };
      case 'blur':
        return { ...baseStyles, filter: 'blur(10px)' };
      case 'fade':
      default:
        return baseStyles;
    }
  };

  const getVisibleStyles = () => {
    const baseStyles = {
      opacity: '1',
      transform: 'translate(0, 0)',
      filter: 'blur(0px)',
    };

    return baseStyles;
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const initialStyles = getInitialStyles();
    const visibleStyles = getVisibleStyles();

    Object.assign(element.style, initialStyles);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Object.assign(element.style, visibleStyles);
            observer.unobserve(element);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [direction, distance, delay, duration, threshold]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default RevealAnimation;
