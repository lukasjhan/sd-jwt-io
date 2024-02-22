import { Select } from "antd";

export const SelectAlg = () => {
  return (
    <div style={selectAlgWrap}>
      <div>{"Algorithm"}</div>
      <Select
        defaultValue="HS256"
        style={{ width: 100 }}
        onChange={(value: string) => {
          console.log(value);
        }}
        options={[
          { value: "HS256", label: "HS256" },
          { value: "HS384", label: "HS384" },
          { value: "HS512", label: "HS512" },
          { value: "RS256", label: "RS256" },
          { value: "RS384", label: "RS384" },
          { value: "RS512", label: "RS512" },
          { value: "ES256", label: "ES256" },
          { value: "ES384", label: "ES384" },
          { value: "ES512", label: "ES512" },
          { value: "PS256", label: "PS256" },
          { value: "PS384", label: "PS384" },
          { value: "PS512", label: "PS512" },
        ]}
      />
    </div>
  );
};

const selectAlgWrap = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  gap: "1rem",
};
