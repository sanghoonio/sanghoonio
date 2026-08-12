import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import frontMatter from 'front-matter';

type Post = {
  slug: string;
  title: string;
  date: string;
  contents: string;
}

type FrontMatter = {
  title: string;
  date: string;
}

// Journal entries are bundled at build time (eager glob), so posts can be
// resolved once at module load — no async, no empty-then-filled re-render.
const markdownFiles = import.meta.glob('../assets/journal/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

const posts: Post[] = Object.entries(markdownFiles)
  .map(([path, content]) => {
    const { attributes: frontmatter, body: contents } = frontMatter<FrontMatter>(content as string);
    return {
      // Filename (minus extension) is the URL slug, e.g. 2026-08-04-distillation
      slug: path.split('/').pop()!.replace(/\.md$/, ''),
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date,
      contents: contents.trim()
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const formatDate = (date: string) => new Date(date).toISOString().split('T')[0];

const JournalList = () => (
  <>
    {posts.map(post => (
      <Link
        className='portfolio-row journal-entry text-dark text-decoration-none'
        to={`/journal/${post.slug}`}
        key={post.slug}
      >
        <i className='portfolio-caret bi bi-caret-right-fill'></i>
        <span className='portfolio-title'>{post.title}</span>
        <span className='portfolio-desc text-black-50 ms-2'>{formatDate(post.date)}</span>
      </Link>
    ))}

    {/* Pagination — commented out for now.
    To restore: add `const [page, setPage] = useState(1)` and the vars below, render
    `postsToShow` instead of `posts`, and uncomment the controls.
    const postsPerPage = 5;
    const postIndex = (page - 1) * postsPerPage;
    const postsToShow = posts.slice(postIndex, postIndex + postsPerPage);
    const minPage = 1;
    const maxPage = Math.ceil(posts.length / postsPerPage);
    const handlePageClick = (newPage: number) => {
      setPage(newPage);
      document.querySelectorAll('.pagination-hover').forEach((el: Element) => {
        (el as HTMLElement).style.setProperty('--bs-text-opacity', '0.5', 'important');
      });
    };

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

const JournalEntry = ({ post }: { post: Post }) => {
  // Opening an entry from a row far down the list leaves the window scrolled
  // past the (now shorter) container
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [post.slug]);

  return (
    <>
      <Link className='portfolio-row back-row text-dark text-decoration-none mb-4' to='/journal'>
        <i className='portfolio-caret bi bi-caret-left-fill'></i>
        <span>Back</span>
      </Link>
      <div className='portfolio-row journal-entry journal-head mb-3'>
        <span className='portfolio-title'>{post.title}</span>
        <span className='portfolio-desc text-black-50 ms-2'>{formatDate(post.date)}</span>
      </div>
      <div className='journal-body'>
        <ReactMarkdown
          components={{
            // Entry links point off-site, so open them in a new tab
            a: ({ children, ...props }) => (
              <a {...props} target='_blank' rel='noopener noreferrer'>{children}</a>
            )
          }}
        >
          {post.contents}
        </ReactMarkdown>
      </div>
    </>
  );
};

// The heading and intro stay put — only the list container swaps between the
// index and a single entry.
const JournalContents = () => {
  const { slug } = useParams();

  if (slug) {
    const post = posts.find(post => post.slug === slug);
    return post ? <JournalEntry post={post} /> : <Navigate to='/journal' replace />;
  }

  // Older shared links point at ?highlight=YYYY-MM-DD on the list page — send
  // those to the entry's own page instead.
  const highlightedDate = new URLSearchParams(window.location.search).get('highlight');
  if (highlightedDate) {
    const post = posts.find(post => formatDate(post.date) === highlightedDate);
    if (post) return <Navigate to={`/journal/${post.slug}`} replace />;
  }

  return <JournalList />;
};

const Journal: React.FC = () => (
  <>
    <h4 className='fw-medium'>Journal</h4>
    <div className='mb-5'>
      <p>A collection of my thoughts...</p>
    </div>
    <div className='portfolio-list'>
      <JournalContents />
    </div>
  </>
);

export default Journal;
