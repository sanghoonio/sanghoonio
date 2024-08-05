import React from 'react';

const Portfolio: React.FC = () => {
  
  return (
    // <div className='portfolio d-inline-flex gap-2'>
    //   <a className='btn btn-outline-dark p-4 rounded-4' href='https://sanghoon.io/shiny/lifepalette/' target='_blank' rel='noopener noreferrer'>LifePalette</a>
    //   <a className='btn btn-outline-dark p-4 rounded-4' href='https://sanghoon.io/shiny/navisnp/' target='_blank' rel='noopener noreferrer'>NaviSNP</a>
    // </div>
    <div className='text-start'>
      {/*<h4>Coming Soon!</h4>*/}

      <a className='card mb-3 d-block rounded-1 border-dark text-decoration-none' href='https://sanghoon.io/shiny/lifepalette/' target='_blank' rel='noopener noreferrer'>
        <div className='card-body'>
          <h5 className='card-title'>LifePalette</h5>
          <p className='card-text'>a life visualization tool | built with R Shiny</p>
        </div>
      </a>

      <a className='card mb-3 d-block rounded-1 border-dark text-decoration-none' href='https://sanghoon.io/shiny/navisnp/' target='_blank' rel='noopener noreferrer'>
        <div className='card-body'>
          <h5 className='card-title'>NaviSNP</h5>
          <p className='card-text'>a global allele frequency viewer | built with R Shiny</p>
        </div>
      </a>

    </div>
  );
};

export default Portfolio;
