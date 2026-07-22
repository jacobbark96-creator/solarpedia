import React from 'react';
import { buildAbsoluteUrl } from '../lib/seo';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

const Link: React.FC<LinkProps> = ({ to, children, ...props }) => {
  const href = buildAbsoluteUrl(to);
  
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

export { Link };
