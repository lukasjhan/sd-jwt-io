import { ContentWrapper } from '../ContentWrapper';
import { LibraryDescription } from '../LibraryDescription';

export const Library = () => {
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
        <LibraryDescription />
      </ContentWrapper>
      <ContentWrapper>
        <h1>Home</h1>
      </ContentWrapper>
    </div>
  );
};
