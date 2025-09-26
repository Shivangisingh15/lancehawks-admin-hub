import { useState, useEffect } from 'react';
import { OnboardingService } from '@/application/services/OnboardingService';

export const useOnboardingData = () => {
  const [data, setData] = useState({
    floatingCards: [],
    aboutFeatures: [],
    workflowSteps: [],
    testimonials: [],
    stats: {}
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const floatingCards = OnboardingService.getFloatingCards();
        const aboutFeatures = OnboardingService.getAboutFeatures();
        const workflowSteps = OnboardingService.getWorkflowSteps();
        const testimonials = OnboardingService.getTestimonials();
        const stats = OnboardingService.getStatsData();

        setData({
          floatingCards,
          aboutFeatures,
          workflowSteps,
          testimonials,
          stats
        });
      } catch (error) {
        console.error('Error loading onboarding data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading };
};
