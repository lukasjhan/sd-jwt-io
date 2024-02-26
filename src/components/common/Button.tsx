import React from "react";
import { Button as AntButton } from "antd";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Button = ({ onClick, className, style, children }: ButtonProps) => (
  <AntButton
    style={{ marginRight: "15px" }}
    className={`button small-button ${className || ""}`}
    onClick={onClick}
  >
    {children}
  </AntButton>
);

export default Button;
