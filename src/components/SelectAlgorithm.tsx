import { Select } from "antd";

export const SelectAlgorithm = () => {
  return (
    <div style={SelectAlgorithmWrap}>
      <div>{"Algorithm"}</div>
      <Select
        defaultValue="HS256"
        style={{ width: 100 }}
        onChange={(value: string) => {
          console.log(value);
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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  gap: "1rem",
};
