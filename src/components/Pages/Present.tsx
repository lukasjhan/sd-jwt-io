import { CSSProperties } from 'react';
import { Warning } from '../Warning';
import { ContentWrapper } from '../ContentWrapper';
import { SampleEditor } from './SampleEditor';

const Encoded = () => {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid black',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '0.6rem',
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        Encoded SD-JWT
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            width: '500px',
            height: '380px',
            boxSizing: 'border-box',
          }}
        >
          <SampleEditor />
        </div>
      </div>
      <div
        style={{
          padding: '0.6rem',
        }}
      >
        Claims
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            width: '500px',
            height: '400px',
            boxSizing: 'border-box',
          }}
        >
          <SampleEditor />
        </div>
      </div>
    </div>
  );
};

const Frame = () => {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid black',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '0.6rem',
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        PresentationFrame
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            width: '400px',
            height: '810px',
            boxSizing: 'border-box',
          }}
        >
          <SampleEditor />
        </div>
      </div>
    </div>
  );
};

const KBJWT = () => {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid black',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '0.6rem',
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        Key Binding Header
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            width: '300px',
            height: '100px',
          }}
        >
          <SampleEditor />
        </div>
      </div>
      <div
        style={{
          padding: '0.6rem',
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        Key Binding Payload
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            width: '300px',
            height: '435px',
          }}
        >
          <SampleEditor />
        </div>
      </div>
      <div
        style={{
          padding: '0.6rem',
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        Key Binding Signature(Input JWK to verify)
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            width: '300px',
            height: '200px',
          }}
        >
          <SampleEditor />
        </div>
      </div>
    </div>
  );
};

const Claims = () => {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid black',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '0.6rem',
        }}
      >
        Presented SD-JWT
      </div>
      <div>
        <div
          style={{
            borderTop: '1px solid black',
            width: '400px',
            height: '810px',
          }}
        >
          <SampleEditor />
        </div>
      </div>
    </div>
  );
};

const Present = () => {
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
            <Encoded />
            <Frame />
            <KBJWT />
            <Claims />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Present;

const HomeContainer: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
};
