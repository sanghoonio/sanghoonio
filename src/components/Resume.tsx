import React from 'react';

import resumeData from '../assets/resume/resume_data.json';

interface ResumeData {
  education: string[];
  experience: string[];
  // projects: string[];
  skills: string[];
}

const parseLines = (section: string[]) => {
  const lines = (section + '').split('\n');
  const elements: JSX.Element[] = [];

  lines.forEach((line, index) => {
    if (/^\d{4,}/.test(line)) {
      elements.push(<h6 key={index} className='mb-0 pt-0 resume-body resume-year position-relative fw-medium'>{line}</h6>);
    } else if (/^Master of Science/.test(line)) {
      elements.push(<h6 key={index} className='my-0 pt-0 resume-body resume-text position-relative'>{line}</h6>);
    } else if (/^Bachelor of Science/.test(line)) {
      elements.push(<h6 key={index} className='my-0 pt-0 resume-body resume-text position-relative'>{line}</h6>);
    } else if (/^[A-Za-z0-9]/.test(line)) {
      elements.push(<h6 key={index} className='my-0 pt-0 resume-body resume-text position-relative mt-1 fw-medium'>{line}</h6>);
    } else if (/^-/.test(line)) {
      elements.push(<p key={index} className='my-0 py-0 pe-4 mx-4 resume-body resume-text indent position-relative'>{line}</p>);
    } else if (/^\s{2,}/.test(line)) {
      elements.push(<p key={index} className='my-0 py-0 px-4 mx-4 resume-body resume-text indent position-relative'>{line}</p>);
    }
  });

  return elements;
};

const Resume: React.FC = () => {

  return (
    <>
      <div className='d-flex flex-row justify-content-between pb-4 mb-2'>
        <h4 className='fw-medium mb-0'>Sang-Hoon Park</h4>
        <a className='cursor-pointer' href='resume.pdf' download='resume.pdf'>
          <h4 className='bi bi-file-earmark-arrow-down text-dark' />
        </a>
      </div>
      {Object.keys(resumeData).map((section, index) => (
        <div className='mb-3' key={index}>
          <h6 className='mb-0 mt-2 fw-semibold'>{section.charAt(0).toUpperCase() + section.slice(1)}</h6>
          {parseLines(resumeData[section as keyof ResumeData])}
        </div>
      ))}
    </>
  );
};

export default Resume;
