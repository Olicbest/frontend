import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-app text-app">
      <Navbar />
      <main className="relative z-10 pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
