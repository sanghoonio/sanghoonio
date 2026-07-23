import React from 'react';
import { load as loadYaml } from 'js-yaml';

import portfolioContent from '../assets/portfolio/portfolio.yaml?raw';

type PortfolioItem = {
  title: string;
  desc: string;
  link: string;
};

type PortfolioGroup = {
  name: string;
  cards: PortfolioItem[];
};

type PortfolioData = {
  intro: string;
  groups: PortfolioGroup[];
};

const portfolio = loadYaml(portfolioContent) as PortfolioData;

const Portfolio: React.FC = () => {

  return (
    <>
      <h4 className='fw-medium'>Portfolio</h4>
      <div className='mb-5'>
        <p>
          {portfolio.intro.split('[databio]').map((part, index, parts) => (
            <React.Fragment key={index}>
              {part}
              {index < parts.length - 1 && (
                <a
                  className='link-primary text-decoration-none'
                  href='https://databio.org/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  [databio]
                </a>
              )}
            </React.Fragment>
          ))}
        </p>
      </div>

      <div className='portfolio-list'>
        {portfolio.groups.map((group, index) => (
          <div className='mb-4' key={index}>
            <p className='portfolio-group text-black-50 mb-2'>{group.name}</p>
            {group.cards.map((card, cardIndex) => (
              <a
                className='portfolio-row text-dark text-decoration-none'
                href={card.link}
                target='_blank'
                rel='noopener noreferrer'
                key={cardIndex}
              >
                <i className='portfolio-caret bi bi-caret-right-fill'></i>
                <span className='portfolio-title'>{card.title}</span>
                <span className='portfolio-desc text-black-50 ms-2'>{card.desc}</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Portfolio;
