import React from 'react';
import logo from './logo.svg';
import './App.css';
import sdjwt from '@lukas.j.han/sd-jwt';

function stringToUint8Array(str: string) {
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(str);
  return uint8Array;
}

async function test() {
  const claim = {
    test: 'data',
  };
  const credentials = await sdjwt.issue(
    claim,
    stringToUint8Array('secret'),
    {
      _sd: ['test'],
    },
    {
      sign_alg: 'HS256',
    }
  );
  console.log(credentials);
}
test();
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
