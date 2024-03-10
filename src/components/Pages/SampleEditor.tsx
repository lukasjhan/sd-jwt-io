import Editor from 'react-monaco-editor';
import { useState } from 'react';

const sample = {
  firstname: 'John',
  lastname: 'Doe',
  id: '1234',
  ssn: '123-45-6789',
};

export const SampleEditor = () => {
  const [data, setData] = useState(JSON.stringify(sample, null, 2));
  console.log(data);
  const handleEditorChange = (value: string | undefined, event: any) => {
    setData(value || '');
  };

  return (
    <Editor
      language="json"
      value={data}
      onChange={handleEditorChange}
      options={{
        wordWrap: 'on',
        scrollbar: { horizontal: 'hidden', verticalScrollbarSize: 10 },
        minimap: { enabled: false },
        wrappingStrategy: 'advanced',
        lineDecorationsWidth: '1px',
        lineNumbersMinChars: 3,
        tabSize: 2,
        automaticLayout: true,
      }}
    />
  );
};
