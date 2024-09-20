import React from 'react';

const Portfolio: React.FC = () => {
  
  return (
    <>
      <div className='row text-start'>
        <p className='fw-medium mb-2'>React + TS</p>
      </div>
      <div className='row text-start mb-3 g-3'>
        <div className='col-6'>
          <a className='card portfolio-card mb-3 d-block rounded-3 border bg-body-tertiary text-decoration-none' href='https://pephub.databio.org' target='_blank' rel='noopener noreferrer'>
            <div className='card-body'>
              <h5 className='card-title fw-medium'>PEPhub</h5>
              <p className='card-text'>a biological metadata management suite</p>
            </div>
          </a>
        </div>
      </div>

      <div className='row text-start'>
        <p className='fw-medium mb-2'>R Shiny</p>
      </div>
      <div className='row text-start mb-3 g-3'>
        <div className='col-6'>
          <a className='card portfolio-card mb-3 d-block rounded-3 border bg-body-tertiary text-decoration-none' href='https://sanghoon.io/shiny/lifepalette/' target='_blank' rel='noopener noreferrer'>
            <div className='card-body'>
              <h5 className='card-title fw-medium'>LifePalette</h5>
              <p className='card-text'>a life visualization tool</p>
            </div>
          </a>
        </div>

        <div className='col-6'>
          <a className='card portfolio-card mb-3 d-block rounded-3 border bg-body-tertiary text-decoration-none' href='https://sanghoon.io/shiny/navisnp/' target='_blank' rel='noopener noreferrer'>
            <div className='card-body'>
              <h5 className='card-title fw-medium'>NaviSNP</h5>
              <p className='card-text'>a global allele frequency viewer</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
