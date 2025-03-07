import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 w-full bg-secondary shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-primary">
        &copy; {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME} - All Rights Reserved
      </div>
      <div>
        <Link to="/dashboard" className="text-primary hover:text-third">
          Backoffice
        </Link>
      </div>
    </footer>
  );
};

export default Footer;