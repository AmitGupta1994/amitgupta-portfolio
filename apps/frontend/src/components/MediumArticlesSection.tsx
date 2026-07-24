import Image from 'next/image';

type MediumArticle = {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
};

export default async function MediumArticlesSection() {
  let articles: MediumArticle[] = [];
  
  try {
    const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@iamamitgupta1994', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    const data = await res.json();
    if (data.status === 'ok') {
      articles = data.items.slice(0, 3); // Get top 3 latest articles
    }
  } catch (error) {
    console.error('Failed to fetch Medium articles:', error);
  }

  if (articles.length === 0) {
    return null; // Don't render section if no articles
  }

  return (
    <section id="articles" className="w-full">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-4">Latest Articles</h2>
        <p className="text-lg text-neutral-600 max-w-2xl">
          I occasionally write about software engineering, Android development, and technology on Medium.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {articles.map((article) => {
          // Extract a short description by stripping HTML tags
          const plainTextDesc = article.description.replace(/<[^>]+>/g, '');
          const excerpt = plainTextDesc.length > 130 ? plainTextDesc.substring(0, 130) + '...' : plainTextDesc;
          
          // Try to find an image in the content if thumbnail is missing
          let imageUrl = article.thumbnail;
          if (!imageUrl) {
            // Find all image tags in the content
            const imgMatches = Array.from(article.content.matchAll(/<img[^>]+src="([^">]+)"/g));
            // Find the first one that is NOT a Medium tracking pixel
            const validImg = imgMatches.find(match => !match[1].includes('stat?event') && !match[1].includes('medium.com/_/stat'));
            
            if (validImg && validImg[1]) {
              imageUrl = validImg[1];
            } else {
              imageUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"; // Fallback
            }
          }

          return (
            <a 
              key={article.guid} 
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                <Image 
                  src={imageUrl} 
                  alt={article.title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
                  {article.categories.slice(0, 2).map((category) => (
                    <span key={category} className="px-2.5 py-1 bg-neutral-100 text-neutral-600 text-xs font-semibold rounded-md whitespace-nowrap">
                      {category}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-neutral-600 mb-6 flex-grow text-sm line-clamp-3">{excerpt}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
                  <span className="text-xs font-medium text-neutral-500">
                    {new Date(article.pubDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                    Read article →
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
