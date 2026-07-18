import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import resumeMarkdown from '../assets/resume/resume.md?raw';

const Resume: React.FC = () => {

  return (
    <>
      <div className='d-flex flex-row justify-content-between pb-4 mb-2'>
        <h4 className='fw-medium mb-0'>Sang-Hoon Park</h4>
        <a className='cursor-pointer' href='resume.pdf' download='resume.pdf'>
          <h4 className='bi bi-file-earmark-arrow-down text-dark' />
        </a>
      </div>
      <div className='resume-md'>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{resumeMarkdown}</ReactMarkdown>
      </div>
    </>
  );
};

export default Resume;
