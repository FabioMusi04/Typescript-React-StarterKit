import React/* , { useState } */ from 'react';

const Settings: React.FC = () => {
  /* const [openSection, setOpenSection] = useState<number | null>(null);
  const toggleSection = (index: number | null) => {
    setOpenSection(openSection === index ? null : index);
  }; */


  return (
    <p>coming..</p>
    /*     <div className="flex items-center justify-center grow bg-gray-100 dark:bg-gray-900 h-screen">
          <div className="max-w-3xl mx-auto mt-10">
          <h2 className="text-3xl font-semibold text-gray-700 mb-8 text-center">Configuration Wizard</h2>
    
          <div className="border border-gray-300 rounded-md mb-4">
            <button
              onClick={() => toggleSection(1)}
              className="w-full px-4 py-2 bg-gray-100 flex justify-between items-center focus:outline-none"
            >
              <span className="text-lg font-medium">SMTP Configuration</span>
              <span
                className={`transform transition-transform ${
                  openSection === 1 ? 'rotate-90' : ''
                }`}
              >
                ➤
              </span>
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                openSection === 1 ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="p-4">
                <label className="block text-sm mb-2">SMTP Server</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Enter SMTP server"
                />
                <label className="block text-sm mb-2 mt-4">Port</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Enter port"
                />
              </div>
            </div>
          </div>
    
          <div className="border border-gray-300 rounded-md mb-4">
            <button
              onClick={() => toggleSection(2)}
              className="w-full px-4 py-2 bg-gray-100 flex justify-between items-center focus:outline-none"
            >
              <span className="text-lg font-medium">Support Email Configuration</span>
              <span
                className={`transform transition-transform ${
                  openSection === 2 ? 'rotate-90' : ''
                }`}
              >
                ➤
              </span>
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                openSection === 2 ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="p-4">
                <label className="block text-sm mb-2">Support Email</label>
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Enter support email"
                />
              </div>
            </div>
          </div>
    
          <div className="border border-gray-300 rounded-md mb-4">
            <button
              onClick={() => toggleSection(3)}
              className="w-full px-4 py-2 bg-gray-100 flex justify-between items-center focus:outline-none"
            >
              <span className="text-lg font-medium">API Keys Configuration</span>
              <span
                className={`transform transition-transform ${
                  openSection === 3 ? 'rotate-90' : ''
                }`}
              >
                ➤
              </span>
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                openSection === 3 ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="p-4">
                <label className="block text-sm mb-2">API Key</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Enter API key"
                />
              </div>
            </div>
          </div>
    
        </div>
          </div> */
  );
};

export default Settings;