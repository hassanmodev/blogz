import React from 'react';
import Header from './components/Header/Header';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserQuery } from './hooks/useUserQuery';



const App: React.FC = () => {
  const siteName = "Blogz";
  useUserQuery();
  return (
    <div className="min-h-screen bg-gray-50">
      <Header siteName={siteName} />
      <ToastContainer />
    </div>
  );
};

export default App;
