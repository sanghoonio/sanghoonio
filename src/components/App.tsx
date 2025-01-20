import { useState } from 'react';

import About from './About';
import Journal from './Journal';
import Resume from './Resume';
import Portfolio from './Portfolio'

import resumeData from '../assets/resume_data.json';
import '../style.css';

type NavLinkProps = {
  page: string; 
  title: string;
  activePage: string;
  setActivePage: (page: string) => void;
  position: string;
}

const NavLink = (props: NavLinkProps) => {
  const { page, title, activePage, setActivePage, position } = props;

  return(
    <p 
      className={`mb-0 ${position === 'top' ? 'nav-hover cursor-pointer' : ''}`}
      onClick={position === 'top' ? () => setActivePage(page) : undefined}
    >
      <span 
        className={`text-hover cursor-pointer ${activePage === page ? 'text-dark fw-medium' : 'text-black-50'}`}
        onClick={() => setActivePage(page)}
      >
        {title}
        </span>
    </p>
  );
};

function App() {
  const [activePage, setActivePage] = useState('about');

  return (
    <div className='d-flex h-100 w-100 page-padding'>

      <div className='flex-0 sidebar'>
        <div className='row page-width sticky-top'>
          <div className='col-12 py-4'>
            <img 
              src='profile.png' 
              width='132px' 
              height='132px' 
              alt='Hello!'
              style={{ marginTop: '6px' }}
            />
            <h5 className='fw-medium mb-3'>Sam Park</h5>
            <div className='col-12 text-start'>
              <NavLink page={'about'} title={'About'} activePage={activePage} setActivePage={setActivePage} position='side'/>
              <NavLink page={'journal'} title={'Journal'} activePage={activePage} setActivePage={setActivePage} position='side'/>
              <NavLink page={'resume'} title={'Resume'} activePage={activePage} setActivePage={setActivePage} position='side'/>
              <NavLink page={'portfolio'} title={'Portfolio'} activePage={activePage} setActivePage={setActivePage} position='side'/>
            </div>
          </div>
        </div>
      </div>

      <div className='flex-0 topbar sticky-top'>
        <div className='row page-width'>
          <div className='col-12 p-4'>
            <h5 className='d-inline fw-medium mb-3'>Sam Park</h5>
            <span className='d-inline float-end cursor-pointer dropdown-hover' data-bs-toggle='dropdown' aria-expanded='false'>
              <i className="bi bi-three-dots"></i>
            </span>
            <div className='dropdown-menu px-3'>
              <NavLink page='about' title='About' activePage={activePage} setActivePage={setActivePage} position='top'/>
              <NavLink page='journal' title='Journal' activePage={activePage} setActivePage={setActivePage} position='top'/>
              <NavLink page='resume' title='Resume' activePage={activePage} setActivePage={setActivePage} position='top'/>
              <NavLink page='portfolio' title='Portfolio' activePage={activePage} setActivePage={setActivePage} position='top'/>
            </div>
          </div>
        </div>
      </div>

      <div className='flex-1 content'>
        <div className='row page-width'>
          <div className='col-12 p-0 mb-4' id='parent'>
            <div className='p-4' id='about'>
              {activePage === 'about' && <About />}
              {activePage === 'journal' && <Journal />}
              {activePage === 'resume' && <Resume resumeData={resumeData} />}
              {activePage === 'portfolio' && <Portfolio />}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
