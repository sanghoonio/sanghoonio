import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import frontMatter from 'front-matter';
import { load as loadYaml } from 'js-yaml';

import portfolioContent from '../assets/portfolio/portfolio.yaml?raw';

type PortfolioItem = {
  title: string;
  desc: string;
  // A card either links off-site or opens a case study page on this site
  link?: string;
  slug?: string;
};

type PortfolioGroup = {
  name: string;
  cards: PortfolioItem[];
};

type PortfolioData = {
  intro: string;
  groups: PortfolioGroup[];
};

type CaseStudy = {
  slug: string;
  title: string;
  desc: string;
  contents: string;
};

const portfolio = loadYaml(portfolioContent) as PortfolioData;

// Case studies are bundled at build time (same eager-glob pattern as the journal),
// so a card's page resolves synchronously on first render.
const markdownFiles = import.meta.glob('../assets/portfolio/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

const caseStudies: CaseStudy[] = Object.entries(markdownFiles).map(([path, content]) => {
  const { attributes: frontmatter, body: contents } = frontMatter<{ title: string; desc: string }>(content as string);
  return {
    // Filename (minus extension) is the URL slug, matched against a card's `slug`
    slug: path.split('/').pop()!.replace(/\.md$/, ''),
    title: frontmatter.title || 'Untitled',
    desc: frontmatter.desc || '',
    // Without rehype-raw, react-markdown escapes raw HTML and prints it, so an
    // HTML comment would render on the page as literal text. Stripped here to
    // keep them what they look like in the source: notes to self.
    contents: contents.replace(/<!--[\s\S]*?-->/g, '').trim()
  };
});

const PortfolioList = () => (
  <>
    {portfolio.groups.map((group, index) => (
      <div className='mb-4' key={index}>
        <p className='portfolio-group text-black-50 mb-2'>{group.name}</p>
        {group.cards.map((card, cardIndex) => {
          const row = (
            <>
              <i className='portfolio-caret bi bi-caret-right-fill'></i>
              <span className='portfolio-title'>{card.title}</span>
              <span className='portfolio-desc text-black-50 ms-2'>{card.desc}</span>
            </>
          );

          return card.slug ? (
            <Link
              className='portfolio-row text-dark text-decoration-none'
              to={`/portfolio/${card.slug}`}
              key={cardIndex}
            >
              {row}
            </Link>
          ) : (
            <a
              className='portfolio-row text-dark text-decoration-none'
              href={card.link}
              target='_blank'
              rel='noopener noreferrer'
              key={cardIndex}
            >
              {row}
            </a>
          );
        })}
      </div>
    ))}
  </>
);

// One step of magnification past the fitted view. The figures are exported at
// 3200px wide, so the fitted overlay is already downscaled well below native and
// there is real detail left to reach.
const ZOOM = 1.5;

const CaseStudyPage = ({ study }: { study: CaseStudy }) => {
  const [expanded, setExpanded] = useState<{ src: string; alt?: string; title?: string } | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Held in a ref rather than state: a drag fires on every pointermove, and
  // re-rendering to store the origin would fight the transform.
  const drag = useRef<{ x: number; y: number; panX: number; panY: number; moved: boolean } | null>(null);

  // Keep the figure reachable but not lose it: at most half its overflow in each
  // axis, so any edge can be brought to the centre and nothing lands off-screen.
  const clamp = (x: number, y: number) => {
    const el = imageRef.current;
    if (!el) return { x, y };
    const overflowX = Math.max(0, (el.clientWidth * ZOOM - window.innerWidth) / 2);
    const overflowY = Math.max(0, (el.clientHeight * ZOOM - window.innerHeight) / 2);
    return {
      x: Math.min(overflowX, Math.max(-overflowX, x)),
      y: Math.min(overflowY, Math.max(-overflowY, y)),
    };
  };

  const closeOverlay = () => {
    setExpanded(null);
    setZoomed(false);
    setPan({ x: 0, y: 0 });
  };

  // Opening a case study from a row far down the list leaves the window scrolled
  // past the top of the page
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [study.slug]);

  // While a figure is expanded, escape closes it and the page behind it stays put
  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      // The dialog holds at most one focusable control, and it unmounts while
      // zoomed, so tab is kept inside rather than walking the page behind
      if (event.key === 'Tab') {
        event.preventDefault();
        (closeRef.current ?? overlayRef.current)?.focus();
        return;
      }
      if (event.key !== 'Escape') return;
      // Escape steps back out of the zoom first, then closes
      if (zoomed) {
        setZoomed(false);
        setPan({ x: 0, y: 0 });
      } else {
        closeOverlay();
      }
    };
    const { overflow } = document.body.style;

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
    // zoomed is a dependency: without it the handler keeps the value it closed
    // over and escape stops stepping out of the zoom
  }, [expanded, zoomed]);

  // A resize changes how far the figure is allowed to travel, so a pan stored
  // under the old bounds would leave it parked where it can't be recovered
  useEffect(() => {
    if (!zoomed) return;

    const onResize = () => setPan(current => clamp(current.x, current.y));

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [zoomed]);

  // Hand focus to the dialog on open, and take it back to whatever opened it on
  // close, so the figure links stay keyboard-navigable
  useEffect(() => {
    if (!expanded) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    return () => previouslyFocused?.focus?.();
  }, [expanded]);

  // Re-runs on zoom because the close button unmounts there, which would
  // otherwise drop focus to the body
  useEffect(() => {
    if (!expanded) return;
    if (!overlayRef.current?.contains(document.activeElement)) overlayRef.current?.focus();
  }, [expanded, zoomed]);

  return (
    <>
      <Link className='portfolio-row back-row text-dark text-decoration-none mb-4' to='/portfolio'>
        <i className='portfolio-caret bi bi-caret-left-fill'></i>
        <span>Back</span>
      </Link>
      <div className='portfolio-row case-head mb-3'>
        <span className='portfolio-title'>{study.title}</span>
        <span className='portfolio-desc text-black-50 ms-2'>{study.desc}</span>
      </div>
      <div className='portfolio-body'>
        <ReactMarkdown
          components={{
            // Figures: alt text is the accessible description, the markdown title is
            // the visible caption. A plain click expands the figure; the href keeps
            // modified clicks (new tab, save) working on the full-size asset.
            img: ({ src, alt, title }) => (
              <figure className='figure-block'>
                <a
                  className='figure-zoom'
                  href={src as string}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={event => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    setExpanded({ src: src as string, alt, title });
                  }}
                >
                  <img src={src as string} alt={alt} loading='lazy' />
                </a>
                {title && <figcaption className='text-black-50'>{title}</figcaption>}
              </figure>
            ),
            // A figure can't live inside the <p> react-markdown would wrap it in
            p: ({ children, node }) => (
              node?.children.length === 1 && node.children[0].type === 'element' && node.children[0].tagName === 'img'
                ? <>{children}</>
                : <p>{children}</p>
            ),
            a: ({ children, ...props }) => (
              <a {...props} target='_blank' rel='noopener noreferrer'>{children}</a>
            )
          }}
        >
          {study.contents}
        </ReactMarkdown>
      </div>

      {expanded && (
        <div
          ref={overlayRef}
          tabIndex={-1}
          className={`figure-overlay${zoomed ? ' is-zoomed' : ''}`}
          role='dialog'
          aria-modal='true'
          aria-label={expanded.title || expanded.alt || 'Expanded figure'}
          // Backdrop closes only from the fitted view. While zoomed the figure
          // overflows the overlay, so a click landing outside it is usually a
          // missed pan rather than an intent to leave.
          onClick={() => { if (!zoomed) closeOverlay(); }}
        >
          {/* Only on the fitted view: while zoomed the figure fills the screen and
              a control in the corner would sit on top of what you came to read */}
          {!zoomed && (
            <button
              ref={closeRef}
              type='button'
              className='figure-overlay-close'
              aria-label='Close figure'
              onClick={event => { event.stopPropagation(); closeOverlay(); }}
            >
              <i className='bi bi-x-lg'></i>
            </button>
          )}
          <img
            ref={imageRef}
            src={expanded.src}
            alt={expanded.alt}
            draggable={false}
            style={zoomed
              ? { transform: `translate(${pan.x}px, ${pan.y}px) scale(${ZOOM})` }
              : undefined}
            onClick={event => {
              // Kept off the backdrop, which would otherwise close on the same
              // click that is meant to zoom in. A click ending a drag is
              // swallowed, so panning does not toggle the zoom off on release.
              event.stopPropagation();
              if (drag.current?.moved) return;
              setZoomed(prev => !prev);
              setPan({ x: 0, y: 0 });
            }}
            onPointerDown={event => {
              if (!zoomed) return;
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              // Cosmetic only, so it is toggled on the node rather than through
              // state. :active would drop the moment the cursor leaves the image,
              // which during a pan is most of the time.
              event.currentTarget.classList.add('is-panning');
              drag.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y, moved: false };
            }}
            onPointerMove={event => {
              const d = drag.current;
              if (!d) return;
              const dx = event.clientX - d.x;
              const dy = event.clientY - d.y;
              if (Math.abs(dx) > 3 || Math.abs(dy) > 3) d.moved = true;
              setPan(clamp(d.panX + dx, d.panY + dy));
            }}
            onPointerUp={event => {
              // Fires on every click of the fitted figure too, where pointerdown
              // bailed out and never took capture
              if (!drag.current) return;
              event.currentTarget.releasePointerCapture(event.pointerId);
              event.currentTarget.classList.remove('is-panning');
              // Cleared after the click handler has had a chance to read `moved`
              window.setTimeout(() => { drag.current = null; }, 0);
            }}
            onPointerCancel={event => {
              event.currentTarget.classList.remove('is-panning');
              drag.current = null;
            }}
          />
          {expanded.title && !zoomed && (
            <p className='figure-overlay-caption'>{expanded.title}</p>
          )}
        </div>
      )}
    </>
  );
};

// The heading and intro stay put — only the list container swaps between the
// index and a single case study
const PortfolioContents = () => {
  const { slug } = useParams();

  if (slug) {
    const study = caseStudies.find(study => study.slug === slug);
    return study ? <CaseStudyPage study={study} /> : <Navigate to='/portfolio' replace />;
  }

  return <PortfolioList />;
};

const Portfolio: React.FC = () => (
  <>
    <h4 className='fw-medium'>Portfolio</h4>
    <div className='mb-5'>
      <p>
        {portfolio.intro.split('[databio]').map((part, index, parts) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <a
                className='inline-link'
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
      <PortfolioContents />
    </div>
  </>
);

export default Portfolio;
