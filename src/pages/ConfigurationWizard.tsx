import React, { useState } from 'react';
import { ConfigurationFormData } from '../../ts/types';
import { steps } from '../../ts/configurationSteps';
import logo from '../assets/react.svg';

const ConfigurationWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ConfigurationFormData>({
    smtpServer: "",
    port: "",
    supportEmail: "",
    notificationEmail: "",
    notificationEmailPassword: "",
  });

  const [isTransitioning, setIsTransitioning] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const nextStep = () => {
    for (const field of steps[currentStep].fields) {
      if (!formData[field.label.replace(" ", "").toLowerCase() as keyof ConfigurationFormData]) {
        return alert("Please fill in all fields");
      }
    }
    setIsTransitioning(true); 
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
      setIsTransitioning(false); 
    }, 300);
  };

  const previousStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(currentStep - 1); 
      setIsTransitioning(false); 
    }, 300); 
  };

  return (
    <div className="flex items-center justify-center grow bg-gray-100 h-screen dark:bg-gray-800 dark:text-gray-200 p-4">
  <div className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md p-4 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-12 mr-5" />
            <span className="text-xl font-bold text-gray-700 dark:text-gray-200">Sinergia Manager</span>
          </div>
        </div>
      </div>
      <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-6 dark:bg-gray-900 transition-transform duration-500 ease-in-out transform">

        <h2 className={`text-3xl font-semibold mb-6 text-center transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'} dark:text-gray-100`}>
          {steps[currentStep].title}
        </h2>

        <p className={`text-gray-600 mb-6 text-center transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'} dark:text-gray-300`}>
          {steps[currentStep].description}
        </p>

        <div className={`space-y-4 transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {steps[currentStep].fields.map((field, index) => (
            <div key={index}>
              <label className="block text-sm mb-2 dark:text-gray-300">{field.label}</label>
              <input
                type={field.type}
                value={formData[field.label.replace(" ", "").toLowerCase() as keyof ConfigurationFormData]}
                onChange={(e) => handleChange(e, field.label.replace(" ", "").toLowerCase() as keyof ConfigurationFormData)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={previousStep}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 transition-all duration-300 ${currentStep === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            Go Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300"
            >
              Next
            </button>
          ) : (
            <button className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 transition-all duration-300">
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationWizard;
