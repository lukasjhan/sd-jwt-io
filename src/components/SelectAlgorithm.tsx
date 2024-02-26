import { Select } from 'antd';

interface SelectAlgorithmProps {
  alg: string;
  select: (selected: string) => void;
}
export const SelectAlgorithm = ({ select, alg }: SelectAlgorithmProps) => {
  return (
    <div style={SelectAlgorithmWrap}>
      <Select
        style={{ width: 100 }}
        value={alg}
        defaultValue="HS256"
        onChange={(value: string) => {
          select(value);
        }}
      >
        {algorithms.map((option, index) => (
          <Select.Option key={index} value={option.value} disabled={index !== 0}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
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
  marginRight: '8px',
};
