import { Link, useLocation } from "react-router";

type NavLinkProps = {
  page: string; 
  title: string;
  position: string;
  currentPage: string;
}

const NavLink = (props: NavLinkProps) => {
  const { page, title, position, currentPage } = props;


  return(
    <p 
      className={`mb-0 ${position === 'top' ? 'nav-hover cursor-pointer' : ''}`}
    >
      <Link
        className={`text-hover cursor-pointer ${currentPage === page ? 'text-dark fw-medium' : 'text-black-50'}`}
        to={page}
      >
        {title}
      </Link>
    </p>
  );
};

function Navbar() {
  let location = useLocation().pathname.substring(1);
  if (location === '') location = 'about';

  return (
    <>

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
              <NavLink page={'about'} title={'About'} position='side' currentPage={location}/>
              <NavLink page={'journal'} title={'Journal'} position='side' currentPage={location}/>
              <NavLink page={'resume'} title={'Resume'} position='side' currentPage={location}/>
              <NavLink page={'portfolio'} title={'Portfolio'} position='side' currentPage={location}/>
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
              <NavLink page='about' title='About' position='top' currentPage={location}/>
              <NavLink page='journal' title='Journal' position='top' currentPage={location}/>
              <NavLink page='resume' title='Resume' position='top' currentPage={location}/>
              <NavLink page='portfolio' title='Portfolio' position='top' currentPage={location}/>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Navbar;
