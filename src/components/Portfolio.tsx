import React from 'react';

type PortfolioCardProps = {
  title: string; 
  desc: string;
  link: string;
}

const PortfolioCard = (props: PortfolioCardProps) => {
  const { title, desc, link } = props;

  return (
    <div className='col-12'>
      <a className='card portfolio-card d-block rounded-2 border bg-body-tertiary text-decoration-none' href={link} target='_blank' rel='noopener noreferrer'>
        <div className='card-body'>
          <h5 className='card-title fw-medium'>{title}</h5>
          <p className='card-text mb-0'>{desc}</p>
        </div>
      </a>
    </div>
  );
};

const Portfolio: React.FC = () => {
  
  return (
    <>
      <h4 className='fw-medium'>Projects</h4>
      <div className='mb-5'>
        <p>Below are some lab and personal projects I have worked on. Building on my earlier experiences with R Shiny, I am currently learning about web development with React + TypeScript and find developing intuitive and visually appealing interfaces to be very fun.</p>
        <p>Lab collaborations are marked with [databio].</p>
      </div>

      <div className='row text-start'>
        <p className='fw-medium mb-2'>React + TS</p>
      </div>
      <div className='row text-start mb-5 g-2'>
        <PortfolioCard title='PEPhub' desc='a biological metadata management suite [databio]' link='https://pephub.databio.org' />
        <PortfolioCard title='BEDbase' desc='a centralized platform for genomic region data [databio]' link='https://bedbase.org' />
        <PortfolioCard title='Refgenie' desc="a standardized genome asset management system [databio]" link='https://ui.refgenie.org' />
        <PortfolioCard title='Tessera' desc="an intuitive and aesthetic interface for single-cell data" link='https://sanghoon.io/tessera' />
        <PortfolioCard title='Cigareditte' desc="scrolling social media feeds is like smoking an infinite cigarette. what if the cigarettes weren't infinite anymore?" link='https://sanghoon.io/cigareditte' />
        {/* <PortfolioCard title='Constellations' desc='a social media concept inspired by the cosmos' link='https://sanghoonio.github.io/constellations/' /> */}
      </div>

      <div className='row text-start'>
        <p className='fw-medium mb-2'>Shiny | Plotly Dash</p>
      </div>
      <div className='row text-start mb-5 g-2'>
        <PortfolioCard title='LifePalette' desc='a life visualization tool' link='https://sanghoon.io/shiny/lifepalette/' />
        <PortfolioCard title='NaviSNP' desc='an ancestry-based global allele frequency viewer' link='https://sanghoon.io/shiny/navisnp/' />
        <PortfolioCard title='GSS Dashboard' desc='investigating the gender pay gap with GSS data [DS6001]' link='https://sanghoonio.pythonanywhere.com' />
      </div>
    </>
  );
};

export default Portfolio;
