import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
      
      
    </div>
  )
}

export default App