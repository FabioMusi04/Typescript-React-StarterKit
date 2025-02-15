import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Drawer from '../components/Drawer';
import Navbar from '../components/Navbar';
import { Table } from '../components/Table';
import { IAlertProps } from '../../ts/types';
import Alert from '../components/Alert';

const Dashboard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'dashboard';

  const [alert, setAlert] = useState<IAlertProps>({
    message: '',
    type: 'success',
    onClose: () => { },
  });

  const renderContent = () => {
    switch (currentTab) {
      case 'Users':
        return <Table type="users" initialData={[]} ignoreFields={['password', 'salt', 'socialProviders, __v']} setAlert={setAlert} />;
      case 'dashboard':
      default:
        return (
          <div>
            <h2 className='text-secondary'>Dashboard Overview</h2>
          </div>
        );
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-third">
      <Alert {...alert} />
      <Drawer />
      <div className="flex-grow p-3 md:p-6 w-full">
        <Navbar />
        <h1 className="text-xl md:text-2xl font-bold text-secondary text-center mt-2 md:mt-3">
          {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;