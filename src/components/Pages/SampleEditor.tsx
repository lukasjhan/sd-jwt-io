import Editor from 'react-monaco-editor';

export const SampleEditor = ({
  readonly,
  value,
  updateValue,
}: {
  readonly?: boolean;
  value: string;
  updateValue: (data: string) => void;
}) => {
  const handleEditorChange = (value: string | undefined, event: any) => {
    updateValue(value || '');
  };

  return (
    <Editor
      language="json"
      value={value}
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
        readOnly: readonly,
        fontSize: 12,
      }}
    />
  );
};
