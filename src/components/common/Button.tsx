import React from "react";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Button = ({ onClick, className, style, children }: ButtonProps) => (
  <div
    className={`button small-button ${className || ""}`}
    onClick={onClick}
    style={style}
  >
    {children}
  </div>
);

export default Button;
