import { CSSProperties } from 'react';
import { Warning } from '../Warning';
import { ContentWrapper } from '../ContentWrapper';

const Issue = () => {
  return (
    <div style={HomeContainer}>
      <ContentWrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Warning />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <div>1</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Issue;

const HomeContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
};
