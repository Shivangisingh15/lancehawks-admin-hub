/////////////onboardingscreen/////////////////
import React from 'react';
import { CheckCircle } from 'lucide-react';

const FloatingCardComponent = ({ card, index, isLoaded }) => {
  const baseClasses = "absolute bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 p-4 border border-gray-100";
  const positions = {
    'top-left': 'top-8 left-8 w-48',
    'top-right': 'top-16 right-12 w-52',
    'bottom-left': 'bottom-16 left-12 w-56',
    'bottom-right': 'bottom-8 right-8 w-48'
  };

  const animationDelay = `${index * 200 + 600}ms`;

  const renderContent = () => {
    if (card.isStatsType()) {
      return (
        <div className="space-y-2">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-900">{card.value}</span>
            <span className="text-sm text-green-600 font-medium">{card.trend}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full w-4/5"></div>
          </div>
        </div>
      );
    }

    if (card.isChartType()) {
      return (
        <div className="flex items-end gap-1 h-16">
          {card.data.map((value, i) => (
            <div
              key={i}
              className="bg-gradient-to-t from-violet-500 to-purple-400 rounded-sm flex-1"
              style={{ height: `${value}%` }}
            ></div>
          ))}
        </div>
      );
    }

    if (card.isAgendaType()) {
      return (
        <div className="space-y-2">
          {card.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span className="text-xs text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      );
    }

    if (card.isTeamType()) {
      return (
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
      );
    }

    return null;
  };

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
      {renderContent()}
    </div>
  );
};

export default FloatingCardComponent;