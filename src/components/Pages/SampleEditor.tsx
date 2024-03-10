import Editor from 'react-monaco-editor';
import { useState } from 'react';

export const SampleEditor = () => {
  const [data, setData] = useState(
    'eyJ0eXAiOiJzZC1qd3QiLCJhbGciOiJIUzI1NiJ9.eyJsYXN0bmFtZSI6IkRvZSIsInNzbiI6IjEyMy00NS02Nzg5IiwiX3NkIjpbImVfMnZHTkpGcXBBVHNxd21NcDVJWXQ0cHlSb25KQmVOV2pNN3BJdFJtMUkiLCJ4UnptQWlCYjV5Vk9jUHNDWUdwaEVCdjRCZWRtVkZpQlBnakROLWNjN1NRIl0sIl9zZF9hbGciOiJTSEEtMjU2In0.IgTBKAhwyT0qaopCQUC_-RYKC2uBknxEwucCWAgSBXM~WyI5NDUxZjMzN2E4ZTQ3NzU5IiwiZmlyc3RuYW1lIiwiSm9obiJd~WyI3NjQ1YjUwOTM1YjQ4ZmNjIiwiaWQiLCIxMjM0Il0~eyJ0eXAiOiJzZC1qd3QiLCJhbGciOiJIUzI1NiJ9.eyJsYXN0bmFtZSI6IkRvZSIsInNzbiI6IjEyMy00NS02Nzg5IiwiX3NkIjpbImVfMnZHTkpGcXBBVHNxd21NcDVJWXQ0cHlSb25KQmVOV2pNN3BJdFJtMUkiLCJ4UnptQWlCYjV5Vk9jUHNDWUdwaEVCdjRCZWRtVkZpQlBnakROLWNjN1NRIl0sIl9zZF9hbGciOiJTSEEtMjU2In0.IgTBKAhwyT0qaopCQUC_-RYKC2uBknxEwucCWAgSBXM',
  );
  console.log(data);
  const handleEditorChange = (value: string | undefined, event: any) => {
    setData(value || '');
  };

  return (
    <Editor
      language="javascript"
      value={data}
      onChange={handleEditorChange}
      options={{
        wordWrap: 'on',
        scrollbar: { horizontal: 'hidden', verticalScrollbarSize: 10 },
        minimap: { enabled: false },
        wrappingStrategy: 'advanced',
        lineDecorationsWidth: '1px',
        lineNumbersMinChars: 3,
      }}
    />
  );
};
