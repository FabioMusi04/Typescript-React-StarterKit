import React from 'react';
import Drawer from '../components/Drawer';
import Navbar from '../components/Navbar';

const Dashboard: React.FC = () => {
    return (
        <>
        <div className="flex h-screen">
          <Drawer />

          <div className="flex-grow bg-gray-100 dark:bg-gray-900 p-6">
            <Navbar />
            <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 text-center mt-3">
              Dashboard
            </h1>
          </div>
        </div>
      </>
    );
};

export default Dashboard;