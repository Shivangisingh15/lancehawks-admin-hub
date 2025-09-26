import { Feature } from '@/domain/entities/Feature';
import { WorkflowStep } from '@/domain/entities/WorkflowStep';
import { Testimonial } from '@/domain/entities/Testimonial';
import { FloatingCard } from '@/domain/entities/FloatingCard';
import {
  FLOATING_CARDS_DATA,
  ABOUT_FEATURES_DATA,
  WORKFLOW_STEPS_DATA,
  TESTIMONIALS_DATA
} from '@/shared/constants/onboardingData';

export class OnboardingService {
  static getFloatingCards() {
    return FLOATING_CARDS_DATA.map(cardData => new FloatingCard(cardData));
  }

  static getAboutFeatures() {
    return ABOUT_FEATURES_DATA.map(featureData => new Feature(featureData));
  }

  static getWorkflowSteps() {
    return WORKFLOW_STEPS_DATA.map(stepData => new WorkflowStep(stepData));
  }

  static getTestimonials() {
    return TESTIMONIALS_DATA.map(testimonialData => new Testimonial(testimonialData));
  }

  static getCoreFeatures() {
    return this.getAboutFeatures().filter(feature => feature.isCore());
  }

  static getStatsData() {
    return {
      activeTeams: '10K+',
      projectsCompleted: '500K+',
      uptime: '99.9%',
      customerRating: '4.9/5'
    };
  }
}
