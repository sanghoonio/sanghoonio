import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

type Post = {
  title: string;
  date: string;
  content: string;
}

const parseMd = (rawContent: string) => {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const matches = rawContent.match(frontMatterRegex);
  
  if (!matches) return { data: {}, content: rawContent };

  const frontMatter = matches[1].trim();
  const content = matches[2].trim();

  const data: Record<string, string> = {};
  frontMatter.split('\n').forEach(line => {
    const [key, value] = line.split(':');
    if (key && value.length) {
      data[key.trim()] = value.trim();
    }
  });

  return { data, content };
};

const JournalCard = (props: Post) => {
  const { title, date, content } = props;

  return (
    <div className="col-12">
    <div 
      className={`card portfolio-card d-block rounded-2 border bg-body-tertiary text-decoration-none cursor-pointer ${date}`}
      data-bs-toggle="collapse"
      data-bs-target={`#${date}`}
      aria-expanded="false"
      aria-controls={date}
    >
      <div className="card-body">
        <h5 className="card-title fw-medium">{title}</h5>
        <p className="card-text mb-0">{date}</p>
        <div className="collapse mt-4 no-transition" id={date}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  </div>
  );
};

const Journal: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

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
            const { data, content: mdContent } = parseMd(content as string);
            
            return {
              title: data.title || 'Untitled',
              date: data.date || '2000-01-01',
              content: mdContent.trim()
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
      <h4 className="fw-medium">Journal</h4>
      <div className="mb-5">
        <p>A collection of my thoughts...</p>
      </div>
      {posts.map(post => (
        <JournalCard key={post.date} {...post} />
      ))}
    </>
  );
};

export default Journal;
