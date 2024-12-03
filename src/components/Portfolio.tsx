import React from 'react';

type PortfolioCardProps = {
  title: string; 
  desc: string;
  link: string;
}

const PortfolioCard = (props: PortfolioCardProps) => {
  const { title, desc, link } = props;

  return(
    <div className='col-6'>
      <a className='card portfolio-card d-block rounded-3 border bg-body-tertiary text-decoration-none' href={link} target='_blank' rel='noopener noreferrer'>
        <div className='card-body'>
          <h5 className='card-title fw-medium'>{title}</h5>
          <p className='card-text'>{desc}</p>
        </div>
      </a>
    </div>
  );
};

const Portfolio: React.FC = () => {
  
  return (
    <>
      <div className='row text-start'>
        <p className='fw-medium mb-2'>React + TS</p>
      </div>
      <div className='row text-start mb-5 g-3'>
        <PortfolioCard title='PEPhub' desc='a biological metadata management suite [databio]' link='https://pephub.databio.org' />
        <PortfolioCard title='BEDbase' desc='a centralized platform for genomic region data [databio]' link='https://bedbase.org' />
        <PortfolioCard title='Constellations' desc='a social media concept inspired by the cosmos' link='https://sanghoonio.github.io/constellations/' />
      </div>

      <div className='row text-start'>
        <p className='fw-medium mb-2'>R Shiny</p>
      </div>
      <div className='row text-start mb-5 g-3'>
        <PortfolioCard title='LifePalette' desc='a life visualization tool' link='https://sanghoon.io/shiny/lifepalette/' />
        <PortfolioCard title='NaviSNP' desc='an ancestry-based global allele frequency viewer' link='https://sanghoon.io/shiny/navisnp/' />
      </div>
    </>
  );
};

export default Portfolio;
