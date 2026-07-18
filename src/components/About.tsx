import React from 'react';
import ReactMarkdown from 'react-markdown';
import frontMatter from 'front-matter';

import aboutContent from '../assets/about/about.md?raw';

type AboutData = {
  socials: {
    github: string;
    linkedin: string;
  };
  interests: string[];
};

const { attributes, body } = frontMatter<AboutData>(aboutContent);

const About: React.FC = () => {

  return (
    <>
      <h4 className='fw-medium'>Hello!</h4>
      <div>
        <ReactMarkdown>{body.trim()}</ReactMarkdown>
      </div>

      <p className="d-inline-flex gap-2">
        <a href={attributes.socials.github} target='_blank' rel='noopener noreferrer'>
          <i className='bi bi-github text-dark h5'/>
        </a>
        <a href={attributes.socials.linkedin} target='_blank' rel='noopener noreferrer'>
          <i className='bi bi-linkedin text-dark h5'/>
        </a>
      </p>

      <h5 className='mt-4 fw-medium'>Interests</h5>
      <div>
        {attributes.interests.map((interest, index) => (
          <p className='mb-0' key={index}>{interest}</p>
        ))}
      </div>
    </>
  );
};

export default About;
