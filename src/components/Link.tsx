import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

const Link: React.FC<LinkProps> = ({ to, children, ...props }) => {
  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
};

export { Link };
