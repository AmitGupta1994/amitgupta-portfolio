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
      next: { revalidate: 3600 }
    });
    const data = await res.json();
    if (data.status === 'ok') {
      articles = data.items.slice(0, 3);
    }
  } catch (error) {
    console.error('Failed to fetch Medium articles:', error);
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section id="articles" className="w-full flex flex-col gap-6 scroll-mt-24">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight mb-2">Latest Articles</h2>
        <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
          I occasionally write about software engineering, system design, and mobile development on Medium.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const plainTextDesc = article.description.replace(/<[^>]+>/g, '');
          const excerpt = plainTextDesc.length > 130 ? plainTextDesc.substring(0, 130) + '...' : plainTextDesc;
          
          let imageUrl = article.thumbnail;
          if (!imageUrl) {
            const imgMatches = Array.from(article.content.matchAll(/<img[^>]+src="([^">]+)"/g));
            const validImg = imgMatches.find(match => !match[1].includes('stat?event') && !match[1].includes('medium.com/_/stat'));
            
            if (validImg && validImg[1]) {
              imageUrl = validImg[1];
            } else {
              imageUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800";
            }
          }

          return (
            <a 
              key={article.guid} 
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-white border border-neutral-200/80 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 dark:bg-neutral-900/60 dark:border-neutral-800 dark:hover:border-neutral-700"
            >
              <div className="relative h-44 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image 
                  src={imageUrl} 
                  alt={article.title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex gap-1.5 mb-3 overflow-x-auto">
                  {article.categories.slice(0, 2).map((category) => (
                    <span key={category} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 text-[11px] font-medium rounded-md whitespace-nowrap">
                      {category}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-5 flex-grow text-xs leading-relaxed line-clamp-3">{excerpt}</p>
                
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                    {new Date(article.pubDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 group-hover:underline transition-colors">
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
