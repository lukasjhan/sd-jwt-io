import Editor from 'react-monaco-editor';
import { useState } from 'react';
import * as monaco from 'monaco-editor';

monaco.languages.register({ id: 'sdjwt' });
monaco.languages.setMonarchTokensProvider('sdjwt', {
  tokenizer: {
    root: [
      // Matches the header part of the JWT, excluding the dot
      [/^([A-Za-z0-9_-]+)(?=\.)/, 'header'],
      [/~([A-Za-z0-9_-]+)(?=\.)/, 'kbheader'],
      // Matches the payload part of the JWT, excluding the dots on both sides
      [/\.([A-Za-z0-9_-]+)(?=\.)/, 'payload'],
      // Matches the signature part of the JWT, excluding the preceding dot
      [/\.([A-Za-z0-9_-]+)(?=~)/, 'signature'],
      [/\.([A-Za-z0-9_-]+)(?=$)/, 'signature'],
      // Matches the disclosure part of the SD-JWT
      [/~([A-Za-z0-9_-]+)(?=~)/, 'disclosure'],
    ],
  },
});

monaco.editor.defineTheme('sdjwtTheme', {
  base: 'vs', // can also be vs-dark or hc-black
  inherit: false, // can also be false to completely replace the built-in rules
  rules: [
    { token: 'disclosure', foreground: '#800080' }, // Style for JWT Delimiter
    { token: 'header', foreground: '#fb015b' }, // Style for JWT Header
    { token: 'kbheader', foreground: '#fb015b' }, // Style for JWT Header
    { token: 'payload', foreground: '#d63aff' }, // Style for JWT Payload
    { token: 'signature', foreground: '#00b9f1' }, // Style for JWT Signature
  ],
  colors: {},
});

export const SDJWTEditor = () => {
  // This is hacky, but it's the only way to get the theme to apply
  const [theme, setTheme] = useState('');
  const [data, setData] = useState(
    'eyJ0eXAiOiJzZC1qd3QiLCJhbGciOiJIUzI1NiJ9.eyJsYXN0bmFtZSI6IkRvZSIsInNzbiI6IjEyMy00NS02Nzg5IiwiX3NkIjpbImVfMnZHTkpGcXBBVHNxd21NcDVJWXQ0cHlSb25KQmVOV2pNN3BJdFJtMUkiLCJ4UnptQWlCYjV5Vk9jUHNDWUdwaEVCdjRCZWRtVkZpQlBnakROLWNjN1NRIl0sIl9zZF9hbGciOiJTSEEtMjU2In0.IgTBKAhwyT0qaopCQUC_-RYKC2uBknxEwucCWAgSBXM~WyI5NDUxZjMzN2E4ZTQ3NzU5IiwiZmlyc3RuYW1lIiwiSm9obiJd~WyI3NjQ1YjUwOTM1YjQ4ZmNjIiwiaWQiLCIxMjM0Il0~eyJ0eXAiOiJzZC1qd3QiLCJhbGciOiJIUzI1NiJ9.eyJsYXN0bmFtZSI6IkRvZSIsInNzbiI6IjEyMy00NS02Nzg5IiwiX3NkIjpbImVfMnZHTkpGcXBBVHNxd21NcDVJWXQ0cHlSb25KQmVOV2pNN3BJdFJtMUkiLCJ4UnptQWlCYjV5Vk9jUHNDWUdwaEVCdjRCZWRtVkZpQlBnakROLWNjN1NRIl0sIl9zZF9hbGciOiJTSEEtMjU2In0.IgTBKAhwyT0qaopCQUC_-RYKC2uBknxEwucCWAgSBXM',
  );
  const handleEditorChange = (value: string | undefined, event: any) => {
    setData(value || '');
  };

  return (
    <Editor
      language="sdjwt"
      value={data}
      onChange={handleEditorChange}
      theme={theme}
      editorDidMount={() => {
        setTheme('sdjwtTheme');
      }}
      options={{
        wordWrap: 'on',
        scrollbar: { horizontal: 'hidden', verticalScrollbarSize: 10 },
        minimap: { enabled: false },
        wrappingStrategy: 'advanced',
        lineNumbersMinChars: 3,
        tabSize: 2,
        automaticLayout: true,
      }}
    />
  );
};
