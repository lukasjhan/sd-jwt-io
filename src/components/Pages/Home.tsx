import React from 'react';
import { ContentWrapper } from '../ContentWrapper';
import { Description } from '../Description';

export const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <ContentWrapper
        style={{
          background: 'black',
          color: 'white',
        }}
      >
        <Description />
      </ContentWrapper>
      <ContentWrapper>
        <h1>Home</h1>
      </ContentWrapper>
    </div>
  );
};
