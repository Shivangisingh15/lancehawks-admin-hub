import React, { useState, useEffect } from 'react';
import { Shield, Star, ArrowRight, MessageSquare, CheckCircle } from 'lucide-react';
import { useOnboardingData } from '@/application/hooks/useOnboardingData';
import { useScrollNavigation } from '@/application/hooks/useScrollNavigation';
import { SECTIONS } from '@/domain/constants/onboarding';
import FloatingCardComponent from '@/presentation/components/auth/FloatingCardComponent';

const OnboardingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
//   const [currentStep, setCurrentStep] = useState('onboarding');
   const [, setCurrentStep] = useState('onboarding');
  const { data, loading } = useOnboardingData();
  const { activeSection, navigateToSection } = useScrollNavigation();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-400 ${
        isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">LanceHawks</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigateToSection(SECTIONS.ABOUT)}
                className={`font-medium transition-colors ${
                  activeSection === SECTIONS.ABOUT ? 'text-violet-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => navigateToSection(SECTIONS.HOW_IT_WORKS)}
                className={`font-medium transition-colors ${
                  activeSection === SECTIONS.HOW_IT_WORKS ? 'text-violet-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                How it Works
              </button>
              <button 
                onClick={() => navigateToSection(SECTIONS.CUSTOMERS)}
                className={`font-medium transition-colors ${
                  activeSection === SECTIONS.CUSTOMERS ? 'text-violet-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Customers
              </button>
            </div>

            <button 
              onClick={() => setCurrentStep('login')}
              className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Try Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id={SECTIONS.HERO} className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          
          <div className={`flex justify-center mb-8 transition-all duration-600 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="h-4 w-4" />
              Top AI on Tech Companies
            </div>
          </div>

          <div className="relative">
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
                 Log In
                  <ArrowRight className="h-5 w-5" />
                </button>
                
                <button className="border-2 border-gray-300 hover:border-violet-300 text-gray-700 hover:text-violet-600 px-8 py-4 rounded-2xl font-semibold text-lg inline-flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Phone Mockup with Floating Cards */}
            <div className="relative flex justify-center">
              <div className={`relative z-10 transition-all duration-800 delay-400 ${
                isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
              }`}>
                <div className="w-72 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] relative overflow-hidden">
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
              {data.floatingCards.map((card, index) => (
                <FloatingCardComponent 
                  key={card.id} 
                  card={card} 
                  index={index} 
                  isLoaded={isLoaded}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id={SECTIONS.ABOUT} className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Built for Modern Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              LanceHawks combines cutting-edge technology with intuitive design to deliver 
              the most powerful project management experience your team has ever used.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* {data.aboutFeatures.map((feature, index) => ( */}
                    {data.aboutFeatures.map((feature) => (
              <div 
                key={feature.id}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id={SECTIONS.HOW_IT_WORKS} className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Simple, Powerful Workflow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your team up and running in minutes with our streamlined onboarding process 
              and intuitive project management tools.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {data.workflowSteps.map((step) => (
                <div key={step.id} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                      {step.getStepNumber()}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Workflow Overview</h3>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {data.workflowSteps.map((step) => (
                    <div key={step.id} className="flex items-center gap-4 p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <step.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{step.title}</div>
                        <div className="text-sm text-gray-600">Step {step.getStepNumber()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customers Section */}
      <section id={SECTIONS.CUSTOMERS} className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of teams who have transformed their project management 
              with LanceHawks and achieved remarkable results.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-violet-600 mb-2">{data.stats.activeTeams}</div>
              <div className="text-gray-600">Active Teams</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{data.stats.projectsCompleted}</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-violet-600 mb-2">{data.stats.uptime}</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{data.stats.customerRating}</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid lg:grid-cols-3 gap-8">
            {data.testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.getInitials()}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {testimonial.getFullStars().map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  "{testimonial.testimonial}"
                </p>
                
                <div className="text-sm text-violet-600 font-medium">
                  {testimonial.company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-violet-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Projects?
          </h2>
          <p className="text-xl text-violet-100 mb-8 leading-relaxed">
            Join thousands of teams already using LanceHawks to deliver projects faster, 
            smarter, and with better results than ever before.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentStep('login')}
              className="bg-white text-violet-600 hover:bg-violet-50 px-8 py-4 rounded-2xl font-semibold text-lg inline-flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold text-lg inline-flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1">
              Schedule Demo
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnboardingPage;