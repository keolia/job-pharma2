import React from 'react';
import { Calendar } from 'lucide-react';

interface BlogPostProps {
  title: string;
  content: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  content,
  date,
  category,
  author,
  readTime
}) => {
  return (
    <article className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-green-600">{category}</span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            {date}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
        <div className="flex items-center justify-between text-gray-600">
          <span>{author}</span>
          <span>{readTime}</span>
        </div>
      </header>

      <div className="prose max-w-none">
        {content.split('\n\n').map((section, index) => {
          if (section.trim().startsWith('- ')) {
            return (
              <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                {section.split('\n').map((item, i) => (
                  <li key={i} className="text-gray-700">
                    {item.replace('- ', '')}
                  </li>
                ))}
              </ul>
            );
          }

          if (section.trim().endsWith(':')) {
            return (
              <h2 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                {section}
              </h2>
            );
          }

          return (
            <p key={index} className="text-gray-700 mb-4 leading-relaxed">
              {section}
            </p>
          );
        })}
      </div>
    </article>
  );
};

export default BlogPost;