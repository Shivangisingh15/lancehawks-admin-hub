import {
  TrendingUp,
  BarChart3,
  Calendar,
  Users,
  Zap,
  Shield,
  Globe,
  Target,
  Briefcase,
  Award
} from 'lucide-react';

export const FLOATING_CARDS_DATA = [
  {
    id: 1,
    type: 'stats',
    title: 'Project Progress',
    value: '85%',
    trend: '+12%',
    icon: TrendingUp,
    position: 'top-left'
  },
  {
    id: 2,
    type: 'chart',
    title: 'Team Performance',
    data: [65, 78, 85, 92, 88],
    icon: BarChart3,
    position: 'top-right'
  },
  {
    id: 3,
    type: 'agenda',
    title: "Today's Tasks",
    items: ['Design Review', 'Team Meeting', 'Code Deploy'],
    icon: Calendar,
    position: 'bottom-left'
  },
  {
    id: 4,
    type: 'team',
    title: 'Active Members',
    count: 24,
    avatars: ['JD', 'AM', 'SK', 'MR'],
    icon: Users,
    position: 'bottom-right'
  }
];

export const ABOUT_FEATURES_DATA = [
  {
    id: 1,
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with performance in mind, delivering instant responses and real-time updates.',
    category: 'core'
  },
  {
    id: 2,
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and security protocols to protect your sensitive project data.',
    category: 'security'
  },
  {
    id: 3,
    icon: Globe,
    title: 'Global Collaboration',
    description: 'Connect teams across time zones with seamless real-time collaboration tools.',
    category: 'collaboration'
  },
  {
    id: 4,
    icon: Target,
    title: 'Smart Analytics',
    description: 'AI-powered insights that help you make data-driven decisions for better outcomes.',
    category: 'analytics'
  }
];

export const WORKFLOW_STEPS_DATA = [
  {
    id: 1,
    step: '01',
    title: 'Connect Your Team',
    description: 'Invite team members and set up your workspace with customizable roles and permissions.',
    icon: Users,
    order: 1
  },
  {
    id: 2,
    step: '02',
    title: 'Create Projects',
    description: 'Set up projects with timelines, milestones, and automated task assignments.',
    icon: Briefcase,
    order: 2
  },
  {
    id: 3,
    step: '03',
    title: 'Track Progress',
    description: 'Monitor real-time progress with visual dashboards and automated reporting.',
    icon: BarChart3,
    order: 3
  },
  {
    id: 4,
    step: '04',
    title: 'Deliver Results',
    description: 'Complete projects faster with AI-powered insights and streamlined workflows.',
    icon: Award,
    order: 4
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CTO, TechStart Inc.',
    avatar: 'SC',
    testimonial: 'LanceHawks transformed how we manage projects. Our delivery time improved by 40% within the first quarter.',
    company: 'TechStart Inc.',
    rating: 5
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Project Manager, GlobalCorp',
    avatar: 'MR',
    testimonial: 'The AI insights are game-changing. We can predict bottlenecks before they happen.',
    company: 'GlobalCorp',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Johnson',
    role: 'Head of Operations, InnovateLab',
    avatar: 'EJ',
    testimonial: 'Finally, a project management tool that our entire team actually enjoys using.',
    company: 'InnovateLab',
    rating: 5
  }
];
