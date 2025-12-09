import React from 'react';
import { SECTIONS } from '../constants';

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const progress = ((currentStep + 1) / (SECTIONS.length + 1)) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-end mb-2 px-1">
        <div>
           <span className="text-sm font-medium text-indigo-600 block">
            الخطوة {currentStep + 1} من {SECTIONS.length}
          </span>
          <h2 className="text-xl font-bold text-gray-900 mt-1">
            {currentStep < SECTIONS.length ? SECTIONS[currentStep].title : "المراجعة والإرسال"}
          </h2>
          <p className="text-sm text-gray-500">
            {currentStep < SECTIONS.length ? SECTIONS[currentStep].subtitle : "Review & Send"}
          </p>
        </div>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};