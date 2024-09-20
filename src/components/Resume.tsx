import React from 'react';

interface ResumeData {
  education: string[];
  experience: string[];
  projects: string[];
  skills: string[];
}

interface Props {
  resumeData: ResumeData;
}

const parseLines = (section: string[]) => {
  const lines = (section + '').split('\n');
  const elements: JSX.Element[] = [];

  lines.forEach((line, index) => {
    if (/^\d{4,}/.test(line)) {
      elements.push(<h6 key={index} className='mb-0 pt-0 resume-body resume-year position-relative'>{line}</h6>);
    } else if (/^[A-Za-z0-9]/.test(line)) {
      elements.push(<h6 key={index} className='my-0 pt-0 resume-body resume-text position-relative'>{line}</h6>);
    } else if (/^-/.test(line)) {
      elements.push(<p key={index} className='my-0 p-0 ms-4 resume-body resume-text indent position-relative'>{line}</p>);
    } else if (/^\s{2,}/.test(line)) {
      elements.push(<p key={index} className='my-0 p-0 ps-4 ms-4 resume-body resume-text indent position-relative'>{line}</p>);
    }
  });

  return elements;
};

const Resume: React.FC<Props> = ({ resumeData }) => {
  
  return (
    <div className='resume'>
      <h4 className='fw-medium pb-4'>Sang-Hoon Park</h4>
      {Object.keys(resumeData).map((section, index) => (
        <div className='mb-3' key={index}>
          <h6 className='mb-0 mt-2 fw-semibold'>{section.charAt(0).toUpperCase() + section.slice(1)}</h6>
          {parseLines(resumeData[section as keyof ResumeData])}
        </div>
      ))}
    </div>
  );
};

export default Resume;
