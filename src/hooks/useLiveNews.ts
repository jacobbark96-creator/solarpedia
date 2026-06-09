import { useState, useEffect } from 'react';

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  category: string;
  link: string;
}

export const useLiveNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // We use an RSS to JSON proxy to fetch real renewable energy news
        const rssUrl = encodeURIComponent('https://www.theguardian.com/environment/renewableenergy/rss');
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
        const data = await response.json();

        if (data.status === 'ok' && data.items) {
          const formattedNews = data.items.slice(0, 4).map((item: any, index: number) => {
            // Remove HTML tags from description for the summary
            const cleanSummary = item.description.replace(/<[^>]*>?/gm, '').slice(0, 120) + '...';
            
            return {
              id: item.guid || String(index),
              date: new Date(item.pubDate).toLocaleDateString('en-GB', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              }),
              title: item.title,
              summary: cleanSummary,
              category: 'Market Update',
              link: item.link
            };
          });
          setNews(formattedNews);
        }
      } catch (error) {
        console.error("Failed to fetch live news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading };
};