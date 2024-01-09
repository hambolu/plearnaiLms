// Loading.js
import React from 'react';
import { useLoading } from './LoadingContext';

const Loading = () => {
  const { loading, simulateLoading } = useLoading();

  // Simulate loading when the component mounts
  React.useEffect(() => {
    const cleanup = simulateLoading();

    return cleanup;
  }, [simulateLoading]);

  return loading ? (
    <div className="loading-screen">
      <p>Loading...</p>
      {/* Add your loading animation or spinner here */}
    </div>
  ) : null;
};

export default Loading;
