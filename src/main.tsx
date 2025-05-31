import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import About from './components/About';
import Journal from './components/Journal';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio'

import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <div className='d-flex flex-column flex-lg-row h-100 w-100 page-padding'>
      <Navbar />
      <div className='flex-1 content'>
        <div className='row page-width'>
          <div className='col-12 p-4 mb-4'>

          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/journal" element={<Journal/>} />
            <Route path="/resume" element={<Resume/>} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>

          </div>
        </div>
      </div>

    </div>
  </BrowserRouter>
)
