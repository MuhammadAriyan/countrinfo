import React from 'react';

const CountryInfo = () => {
  return (
    <div className="bg-my-bg bg-cover bg-no-repeat min-h-screen flex items-center justify-center p-6 font-mono">
      <div className="relative max-w-3xl text-center border-4 border-blue-500 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h1 className="text-blue-700 text-4xl md:text-5xl font-bold mb-6 flex justify-center items-center gap-2">
        Access information about any country around the globe 
        </h1>
        <p className="text-gray-700 text-lg md:text-xl font-light leading-relaxed">
          Your go-to tool for quickly accessing essential information about any country in the world. Whether you are looking for geographic location,or population statistics, this platform delivers everything in one place.
        </p>
        <p className="text-gray-700 text-lg md:text-xl font-light mt-4">
          Perfect for students, travelers, or anyone curious about global diversity, This website helps you stay informed effortlessly.
        </p>
      </div>
    </div>
  );
};

export default CountryInfo;
