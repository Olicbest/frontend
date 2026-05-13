import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-app text-app">
      <div className="watermark" aria-hidden="true">
        @Olicbest
      </div>
      <Navbar />
      <main className="relative z-10 pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
