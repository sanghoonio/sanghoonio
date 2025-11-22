import React from 'react';

const About: React.FC = () => {
  
  return (
    <>
      <h4 className='fw-medium'>Hello!</h4>
      <div>
        <p>I am an engineer with a B.S. in biomedical engineering and a minor in computer science from UVA. As a student, I was able to discover my interest in applying data science and computational modeling to biology and genetics through my courses and research projects. These experiences have contributed to my excitement for a new priority in our field: personalized, data-driven medicine.</p>
        <p>After graduating, I worked at Merck as an automation engineer to support their Gardasil HPV vaccine production process and learn about the manufacturing side of the pharmaceutical industry while simultaneously pursuing my interests in genomics part-time with Predictiv Care Inc., whose mission is to provide a novel DNA-based digital twin service by incorporating our genetic data. I am currently a data analyst working under Dr. Nathan Sheffield with the goals of contributing to genomics research and enhancing my skills in web development.</p>
      </div>

      <p className="d-inline-flex gap-2">
        <a href='https://github.com/sanghoonio' target='_blank' rel='noopener noreferrer'>
          <i className='bi bi-github text-dark h5'/>
        </a>
        <a href='https://www.linkedin.com/in/sanghoonio/' target='_blank' rel='noopener noreferrer'>
          <i className='bi bi-linkedin text-dark h5'/>
        </a>
      </p>

      <h5 className='mt-4'>Interests</h5>
      <div>
        <p className='mb-0'>Interactive Data Visualizations</p>
        <p className='mb-0'>Design Intuition</p>
        <p className='mb-0'>Nature Observation</p>
        <p className='mb-0'>Gardening</p>
      </div>
    </>
  );
};

export default About;
