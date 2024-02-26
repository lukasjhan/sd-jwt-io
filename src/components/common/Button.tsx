import React from 'react';
import { Button as AntButton } from 'antd';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text';
  icon?: React.ReactNode;
}

const Button = ({ onClick, className, style, children, type = 'default', icon }: ButtonProps) => (
  <AntButton
    type={type}
    style={{ marginRight: '8px' }}
    className={`button small-button ${className || ''}`}
    onClick={onClick}
    icon={icon}
  >
    {children}
  </AntButton>
);

export default Button;
