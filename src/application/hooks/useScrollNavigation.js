import { useState, useEffect } from 'react';
import { SECTIONS } from '@/domain/constants/onboarding';
import { getCurrentSection, scrollToSection } from '@/shared/utils/navigation';

export const useScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS.HERO);
  
  const sections = Object.values(SECTIONS);

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = getCurrentSection(sections);
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId) => {
    scrollToSection(sectionId);
  };

  return {
    activeSection,
    navigateToSection,
    sections
  };
};
