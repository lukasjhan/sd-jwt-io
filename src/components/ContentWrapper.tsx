import { CSSProperties } from 'react';

export const ContentWrapper = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div style={containerStyle}>
    <div style={contentWrap}>{children}</div>
  </div>
);

const containerStyle = {
  width: '100%',
};

const contentWrap: CSSProperties = {
  maxWidth: '1800px',
  margin: '0 auto',
  padding: '1rem 0',
  boxSizing: 'border-box',
};
