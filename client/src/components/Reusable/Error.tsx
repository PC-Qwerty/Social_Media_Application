import React, { useState, useEffect } from "react";

interface ErrorPageProps {
  errorCode: number;
}

const Error: React.FC<ErrorPageProps> = ({ errorCode }) => {
  let errorMessage: string;
  let feedback: string;

  switch (errorCode) {
    case 404:
      errorMessage = "Page not found";
      feedback = "The page you are looking for does not exist.";
      break;
    case 500:
      errorMessage = "Internal Server Error";
      feedback = "Something went wrong on our server. Please try again later.";
      break;
    // Add more cases as needed
    default:
      errorMessage = "An error occurred";
      feedback = "Something went wrong.";
  }

  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    // Apply an animation class after the component mounts
    setAnimationClass("fade-in");
  }, []);

  return (
    <div className={` bg-gray-100 ${animationClass}`}>
      <div className="flex flex-col justify-center items-center gap-5 bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-4xl mb-4 text-red">Error {errorCode}</h1>
        <img src="/assets/error.svg" alt="error" className="relative left-8" />
        <div>
          <p className="text-lg text-gray-800">{errorMessage}</p>
          <p className="text-sm text-gray-500 mt-2">{feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
