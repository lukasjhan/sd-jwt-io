import { ReactNode } from 'react';

interface DebuggerContainerProps {
  children: ReactNode;
  headerText: string;
  descriptionText: string;
}

export const DebuggerContainer = ({ children, headerText, descriptionText }: DebuggerContainerProps) => {
  return (
    <div className="code-item">
      <div className="code-title-wrapper">
        <div className="code-title">{headerText}</div>
        <div className="code-desc">{descriptionText}</div>
      </div>
      {children}
    </div>
  );
};
