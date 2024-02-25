import { Select } from 'antd';

interface SelectAlgorithmProps {
  select: (selected: string) => void;
}
export const SelectAlgorithm = ({ select }: SelectAlgorithmProps) => {
  return (
    <div style={SelectAlgorithmWrap}>
      <div>{'Algorithm'}</div>
      <Select
        defaultValue="HS256"
        style={{ width: 100 }}
        onChange={(value: string) => {
          select(value);
        }}
        options={algorithms}
      />
    </div>
  );
};

const algorithms = [
  { value: 'HS256', label: 'HS256' },
  { value: 'ES256', label: 'ES256' },
];

const SelectAlgorithmWrap = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  gap: '1rem',
};
