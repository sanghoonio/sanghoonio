import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import frontMatter from 'front-matter';

type Post = {
  title: string;
  date: string;
  contents: string;
}

type FrontMatter = {
  title: string;
  date: string;
}

const JournalCard = (props: Post & { isHighlighted: boolean }) => {
  const { title, date, contents, isHighlighted } = props;
  
  const [buttonText, setButtonText] = useState('Copy Link');
  
  const formattedDate = new Date(date).toISOString().split('T')[0];
  
  useEffect(() => {
    // scroll highlighted element into view
    if (isHighlighted) {
      const element = document.getElementById(formattedDate);
      if (element) {
        element.classList.add('show');
        element.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [isHighlighted, formattedDate]);

  return (
    <div className='col-12'>
      <div 
        className='card portfolio-card d-block rounded-2 border bg-body-tertiary text-decoration-none cursor-pointer'
        

        aria-expanded={isHighlighted ? 'true' : 'false'}
        aria-controls={formattedDate}
      >
        <div className='stretched-link' data-bs-toggle='collapse' data-bs-target={`#${formattedDate}`}></div>
          <div className='card-body'>
            <h5 className='card-title fw-medium'>{title}</h5>
            <p className='card-text mb-0'>{formattedDate}</p>
            <div className='collapse mt-4 no-transition' id={formattedDate}>
              <ReactMarkdown>{contents}</ReactMarkdown>
              <div className="d-flex">
              <button 
                className="btn btn-sm btn-dark"
                style={{ zIndex: 1 }}
                onClick={() => {
                  navigator.clipboard.writeText(`https://sanghoon.io/journal?highlight=${formattedDate}`)
                  setButtonText('Copied!');
                  setTimeout(() => setButtonText('Copy Link'), 1000);
                }}
              >
                <i className='bi bi-reply-fill me-1' style={{ transform: 'scale(-1, 1)', display: 'inline-block' }}></i>
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Journal: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [highlightedDate, setHighlightedDate] = useState<string | null>(null);

  const handlePageClick = (newPage: number) => {
    setPage(newPage);
    document.querySelectorAll('.pagination-hover').forEach((el: Element) => {
      (el as HTMLElement).style.setProperty('--bs-text-opacity', '0.5', 'important');
    });
   };
  
  const postsPerPage = 5;
  const postIndex = (page - 1) * postsPerPage;
  const postsToShow = posts.slice(postIndex, postIndex + postsPerPage);

  const minPage = 1;
  const maxPage = Math.ceil(posts.length / postsPerPage);
  
  useEffect(() => {
    // check url for highlighted post
    const urlParams = new URLSearchParams(window.location.search);
    const highlight = urlParams.get('highlight');
    if (highlight) {
      setHighlightedDate(highlight);
      
      // find which page the highlighted post is on
      const postIndex = posts.findIndex(post => 
        new Date(post.date).toISOString().split('T')[0] === highlight
      );
      if (postIndex !== -1) {
        const targetPage = Math.floor(postIndex / postsPerPage) + 1;
        setPage(targetPage);
      }
    }
  }, [posts]); 

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const markdownFiles = import.meta.glob('../assets/journal/*.md', { 
          eager: true, 
          query: '?raw',
          import: 'default'
        });

        const loadedPosts = await Promise.all(
          Object.entries(markdownFiles).map(async ([_, content]) => {
            const { attributes: frontmatter, body: contents } = frontMatter<FrontMatter>(content as string);
            
            return {
              title: frontmatter.title || 'Untitled',
              date: frontmatter.date,
              contents: contents.trim()
            };
          })
        );
        
        setPosts(loadedPosts.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ));
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };

    loadPosts();
  }, []);

  return (
    <>
      <h4 className='fw-medium'>Journal</h4>
      <div className='mb-5'>
        <p>A collection of my thoughts...</p>
      </div>
      <div className='row text-start mb-5 g-2'>
        {postsToShow.map(post => {
          const formattedDate = new Date(post.date).toISOString().split('T')[0];
          return (
            <JournalCard 
              key={post.date} 
              title={post.title} 
              date={post.date} 
              contents={post.contents}
              isHighlighted={formattedDate === highlightedDate}
            />
          );
        })}
      </div>

      {maxPage > minPage && (
        <div className='d-flex justify-content-center'>
          <span onClick={() => setPage(Math.max(page - 1, minPage))}>
            <h5 className={`text-dark bi bi-arrow-left-short me-1 cursor-pointer ${page === minPage && 'invisible'}`} /> 
          </span>

          {/* {page > minPage + 2 && (
            <>
              <span className='mx-2 text-dark pagination-hover text-opacity-50 cursor-pointer' onClick={() => setPage(minPage)}>{minPage}</span>
              <span className='mx-2 text-dark text-opacity-50 cursor-default'>...</span>
            </>
          )} */}

          {page > minPage + 1 && <span className='mx-2 text-dark text-opacity-50 pagination-hover cursor-pointer' onClick={() => handlePageClick(page - 2)}>{page - 2}</span>}
          {page > minPage && <span className='mx-2 text-dark text-opacity-50 pagination-hover cursor-pointer' onClick={() => handlePageClick(page - 1)}>{page - 1}</span>}

          <span className='mx-2 fw-bold cursor-pointer' onClick={() => setPage(page)}>{page}</span>

          {page < maxPage && <span className='mx-2 text-dark text-opacity-50 pagination-hover cursor-pointer' onClick={() => handlePageClick(page + 1)}>{page + 1}</span>}
          {page < maxPage - 1 && <span className='mx-2 text-dark text-opacity-50 pagination-hover cursor-pointer' onClick={() => handlePageClick(page + 2)}>{page + 2}</span>}

          {/* {page < maxPage - 2 && (
            <>
              <span className='mx-2 text-dark text-opacity-50 cursor-default'>...</span>
              <span className='mx-2 text-dark pagination-hover text-opacity-50 cursor-pointer' onClick={() => setPage(maxPage)}>{maxPage}</span>
            </>
          )} */}

          <span onClick={() => setPage(Math.min(page + 1, maxPage))}>
            <h5 className={`text-dark bi bi-arrow-right-short ms-1 cursor-pointer ${page === maxPage && 'invisible'}`} />
          </span>
        </div>
      )}
    </>
  );
};

export default Journal;
