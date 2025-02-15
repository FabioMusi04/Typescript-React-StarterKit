const NotFound = () => {
  return (
    <div className="h-screen w-screen bg-primary flex items-center justify-center overflow-hidden">
      <div className="text-center">
        <div className="text-9xl font-bold text-secondary animate-bounce">
          404
        </div>
        
        <h2 className="text-2xl text-secondary mt-4 animate-fade-in">
          Page Not Found
        </h2>
        
        <p className="text-secondary mt-4 mb-8 animate-fade-in-slow">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <button
          className="px-6 py-3 bg-secondaryary text-primary bg-secondary rounded-lg transition-colors hover:scale-105 active:scale-95 transform duration-200"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
