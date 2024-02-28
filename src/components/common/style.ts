import { CSSProperties } from 'react';

export const decodeItem: CSSProperties = {
  // flex: 1,
  padding: '0.8rem 1rem',
  overflowY: 'auto',
  height: '130px',
  // to ensure that the div size is maintained even when there is >no input<.
  // To prevent a >long input< value from exceeding the entire div length, do the following
  width: '100%',
  boxSizing: 'border-box',
};

export const decodeHeader: CSSProperties = {
  padding: '0.4rem 0.8rem',
  borderBottom: '1px solid #ccc',
  fontSize: '0.9rem',
  display: 'flex',
  flexDirection: 'row',
  gap: '0.5rem',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
};

export const decodeHeaderTop: CSSProperties = {
  borderTop: '1px solid #ccc',
};

export const decodeDescStyle = {
  fontSize: '0.6rem',
  color: '#777',
};
