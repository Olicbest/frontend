import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import { AppProvider } from './context/AppContext'
import Register from './pages/Register'
import LoginForm from './pages/LoginForm'
import JobSignup from './pages/JobSignup'
import AccountSignup from './pages/AccountSignup'
import LoginJobPoster from './pages/LoginJobPoster'
import JobPostForm from './pages/JobPostForm'
import About from './pages/About'
import Testimonial from './pages/Testimonial'



const App = () => {
  return (
    <AppProvider>
      <Router>
        
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            <Route path='/jobseekeer' element={<Register />} />
            <Route path='/jobsignup' element={<JobSignup />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/loginjobposter' element={<LoginJobPoster />} />
            <Route path='/accountsignup' element={<AccountSignup />} />
            <Route path='/JobPostForm' element={<JobPostForm />} />
            <Route path='/testimonial' element={<Testimonial />} />

          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App