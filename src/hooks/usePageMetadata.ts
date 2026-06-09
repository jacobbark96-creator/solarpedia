import { useEffect } from 'react';

export const usePageMetadata = (title: string, description: string) => {
  useEffect(() => {
    document.title = `${title} | Solarpedia UK`;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [title, description]);
};
