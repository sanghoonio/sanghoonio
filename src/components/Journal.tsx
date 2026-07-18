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
    <div className='journal-entry'>
      <div
        className='portfolio-row cursor-pointer text-dark'
        data-bs-toggle='collapse'
        data-bs-target={`#${formattedDate}`}
        aria-expanded={isHighlighted ? 'true' : 'false'}
        aria-controls={formattedDate}
      >
        <i className='portfolio-caret bi bi-caret-right-fill'></i>
        <span className='portfolio-title'>{title}</span>
        <span className='portfolio-desc text-black-50 ms-2'>{formattedDate}</span>
      </div>
      <div className='collapse no-transition' id={formattedDate}>
        <div className='journal-body'>
          <ReactMarkdown>{contents}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

const Journal: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [highlightedDate, setHighlightedDate] = useState<string | null>(null);

  // Pagination — commented out for now.
  // To restore: re-add the state/vars below, render `postsToShow` instead of `posts`,
  // uncomment the pagination controls in the JSX, and restore the page-jump logic in the
  // highlight effect (find the post's index and setPage to its page).
  // const [page, setPage] = useState(1);
  // const postsPerPage = 5;
  // const postIndex = (page - 1) * postsPerPage;
  // const postsToShow = posts.slice(postIndex, postIndex + postsPerPage);
  // const minPage = 1;
  // const maxPage = Math.ceil(posts.length / postsPerPage);
  // const handlePageClick = (newPage: number) => {
  //   setPage(newPage);
  //   document.querySelectorAll('.pagination-hover').forEach((el: Element) => {
  //     (el as HTMLElement).style.setProperty('--bs-text-opacity', '0.5', 'important');
  //   });
  // };

  useEffect(() => {
    // check url for highlighted post
    const urlParams = new URLSearchParams(window.location.search);
    const highlight = urlParams.get('highlight');
    if (highlight) {
      setHighlightedDate(highlight);
    }
  }, []);

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
      <div className='portfolio-list'>
        {posts.map(post => {
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

      {/* Pagination — commented out for now
      {maxPage > minPage && (
        <div className='d-flex flex-row justify-content-center'>
          <span onClick={() => setPage(Math.max(page - 1, minPage))}>
            <h5 className={`text-dark bi bi-arrow-left-short me-1 cursor-pointer ${page === minPage && 'd-none'}`} />
          </span>

          {page > minPage + 1 && <span className='mx-2 text-dark text-opacity-50 pagination-hover cursor-pointer' onClick={() => handlePageClick(page - 2)}>{page - 2}</span>}
          {page > minPage && <span className='mx-2 text-dark text-opacity-50 pagination-hover cursor-pointer' onClick={() => handlePageClick(page - 1)}>{page - 1}</span>}

          <span className='mx-2 fw-bold cursor-pointer' onClick={() => setPage(page)}>{page}</span>

          {page < maxPage && <span className='mx-2 text-dark text-opacity-50 pagination-hover cursor-pointer' onClick={() => handlePageClick(page + 1)}>{page + 1}</span>}
          {page < maxPage - 1 && <span className='mx-2 text-dark text-opacity-50 pagination-hover cursor-pointer' onClick={() => handlePageClick(page + 2)}>{page + 2}</span>}

          <span onClick={() => setPage(Math.min(page + 1, maxPage))}>
            <h5 className={`text-dark bi bi-arrow-right-short ms-1 cursor-pointer ${page === maxPage && 'd-none'}`} />
          </span>
        </div>
      )}
      */}
    </>
  );
};

export default Journal;
