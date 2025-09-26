// src/presentation/pages/auth/OnboardingPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  BarChart3, 
  Calendar, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';

const OnboardingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
//   const [currentStep, setCurrentStep] = useState('onboarding');
   const [, setCurrentStep] = useState('onboarding');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Mock floating cards data
  const floatingCards = [
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

  const FloatingCard = ({ card, index }) => {
    const baseClasses = "absolute bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-4 border border-gray-100";
    const positions = {
      'top-left': 'top-8 left-8 w-48',
      'top-right': 'top-16 right-12 w-52',
      'bottom-left': 'bottom-16 left-12 w-56',
      'bottom-right': 'bottom-8 right-8 w-48'
    };

    const animationDelay = `${index * 200 + 600}ms`;

    return (
      <div 
        className={`${baseClasses} ${positions[card.position]} ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ 
          transitionDelay: animationDelay,
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)'
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
            <card.icon className="h-4 w-4 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">{card.title}</h4>
        </div>

        {card.type === 'stats' && (
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900">{card.value}</span>
              <span className="text-sm text-green-600 font-medium">{card.trend}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full w-4/5"></div>
            </div>
          </div>
        )}

        {card.type === 'chart' && (
          <div className="flex items-end gap-1 h-16">
            {card.data.map((value, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-violet-500 to-purple-400 rounded-sm flex-1"
                style={{ height: `${value}%` }}
              ></div>
            ))}
          </div>
        )}

        {card.type === 'agenda' && (
          <div className="space-y-2">
            {card.items.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="text-xs text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        )}

        {card.type === 'team' && (
          <div className="space-y-3">
            <div className="text-lg font-bold text-gray-900">{card.count} Active</div>
            <div className="flex -space-x-2">
              {card.avatars.map((avatar, i) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-medium text-white border-2 border-white"
                >
                  {avatar}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Topbar / Navbar */}
      <nav className={`sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-400 ${
        isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">LanceHawks</span>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">How it Works</a>
              <a href="#customers" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Customers</a>
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => setCurrentStep('login')}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
            LOG IN
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          
          {/* Callout Chip */}
          <div className={`flex justify-center mb-8 transition-all duration-600 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="h-4 w-4" />
              Top AI on Tech Companies
            </div>
          </div>

          {/* Main Content Container */}
          <div className="relative">
            
            {/* Centered Headline */}
            <div className={`text-center mb-16 transition-all duration-700 delay-200 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Level Up
                </span>
                <br />
                Your Project Management
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your workflow with AI-powered insights, seamless collaboration, 
                and intelligent project tracking that adapts to your team's needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setCurrentStep('login')}
                  className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg inline-flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                 PURCHASE NOW
                <ArrowRight className="h-5 w-5" />
                </button>
                
                <button className="border-2 border-gray-300 hover:border-violet-300 text-gray-700 hover:text-violet-600 px-8 py-4 rounded-2xl font-semibold text-lg inline-flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50">
                  Watch Demo
                  <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-current border-y-[4px] border-y-transparent ml-0.5"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Central Phone Mockup with Floating Cards */}
            <div className="relative flex justify-center">
              
              {/* Phone Mockup */}
              <div className={`relative z-10 transition-all duration-800 delay-400 ${
                isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              }`}>
                <div className="w-72 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] relative overflow-hidden">
                    {/* Phone Screen Content */}
                    <div className="p-6 space-y-6">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">Dashboard</h3>
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-2xl">
                          <div className="text-2xl font-bold text-violet-600">24</div>
                          <div className="text-xs text-gray-600">Active Projects</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-2xl">
                          <div className="text-2xl font-bold text-purple-600">87%</div>
                          <div className="text-xs text-gray-600">Completion</div>
                        </div>
                      </div>
                      
                      {/* Progress Bars */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Mobile App</span>
                            <span className="text-violet-600 font-medium">75%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full" style={{width: '75%'}}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Web Platform</span>
                            <span className="text-purple-600 font-medium">90%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full" style={{width: '90%'}}></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Task List */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 text-sm">Recent Tasks</h4>
                        {['UI Design Review', 'Database Migration', 'User Testing'].map((task, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-600">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              {floatingCards.map((card, index) => (
                <FloatingCard key={card.id} card={card} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;