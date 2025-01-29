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

const JournalCard = (props: Post) => {
  const { title, date, contents } = props;
  
  const formattedDate = new Date(date).toISOString().split('T')[0];

  return (
    <div className='col-12'>
    <div 
      className={`card portfolio-card d-block rounded-2 border bg-body-tertiary text-decoration-none cursor-pointer ${date}`}
      data-bs-toggle='collapse'
      data-bs-target={`#${formattedDate}`}
      aria-expanded='false'
      aria-controls={formattedDate}
    >
      <div className='card-body'>
        <h5 className='card-title fw-medium'>{title}</h5>
        <p className='card-text mb-0'>{formattedDate}</p>
        <div className='collapse mt-4 no-transition' id={formattedDate}>
          <ReactMarkdown>{contents}</ReactMarkdown>
        </div>
      </div>
    </div>
  </div>
  );
};

const Journal: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);

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
        {postsToShow.map(post => (
          <JournalCard key={post.date} title={post.title} date={post.date} contents={post.contents} />
        ))}
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
