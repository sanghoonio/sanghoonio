import { useState } from 'react';

import About from './About';
import Resume from './Resume';
import Portfolio from './Portfolio'

import resumeData from '../assets/resume_data.json';
import '../style.css';

function App() {
  const [activeCollapse, setActiveCollapse] = useState('');

  const handleButtonClick = (collapseId: string) => {
    const collapseDiv = document.getElementById(collapseId);
    setTimeout(() => {
      if (collapseDiv?.classList.contains('show')) {
        setActiveCollapse(collapseId);
      } else {
        setActiveCollapse('');
      }
    }, 5);
  };

  return (
    <div className='container' style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <div className='row'>
        <div className='col-12 p-0 mb-4' id='parent'>
          {!activeCollapse ? (
            <div className='col-12 text-center p-0' style={{ marginTop: '37vh' }}>
              <h1 className='mb-1'>Sam Park</h1>
              <p className='pb-3'>Bioinformatics | Software | UI/UX</p>
              <p className="d-inline-flex gap-2">
                <button
                  className={`btn btn-outline-dark ${activeCollapse === 'about' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('about')}
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#about'
                  aria-expanded='false'
                  aria-controls='about'
                >
                  About
                </button>
                <button
                  className={`btn btn-outline-dark ${activeCollapse === 'resume' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('resume')}
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#resume'
                  aria-expanded='false'
                  aria-controls='resume'
                >
                  Resume
                </button>
                <button
                  className={`btn btn-outline-dark ${activeCollapse === 'portfolio' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('portfolio')}
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#portfolio'
                  aria-expanded='false'
                  aria-controls='portfolio'
                >
                  Portfolio
                </button>
              </p>
            </div>
          ) : (
            <div className='col-12 text-center pt-3 border-bottom border-dark'>
              <p className="d-inline-flex gap-2">
                <button
                  className={`btn btn-outline-dark ${activeCollapse === 'about' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('about')}
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#about'
                  aria-expanded='false'
                  aria-controls='about'
                >
                  About
                </button>
                <button
                  className={`btn btn-outline-dark ${activeCollapse === 'resume' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('resume')}
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#resume'
                  aria-expanded='false'
                  aria-controls='resume'
                >
                  Resume
                </button>
                <button
                  className={`btn btn-outline-dark ${activeCollapse === 'portfolio' ? 'active' : ''}`}
                  onClick={() => handleButtonClick('portfolio')}
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#portfolio'
                  aria-expanded='false'
                  aria-controls='portfolio'
                >
                  Portfolio
                </button>
              </p>
            </div>
          )}

          <div className='collapse no-transition p-4' id='about' data-bs-parent='#parent'>
            <div className='page-width'>
              <About />
            </div>
          </div>
          <div className='collapse no-transition p-4' id='resume' data-bs-parent='#parent'>
            <div className='page-width'>
              <Resume resumeData={resumeData} />
              </div>
          </div>
          <div className='collapse no-transition p-4 text-center' id='portfolio' data-bs-parent='#parent'>
            <div className='page-width'>
              <Portfolio />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
