import { ReactNode } from "react";

interface DebuggerContainerProps {
  children: ReactNode;
}

export const DebuggerContainer = ({ children }: DebuggerContainerProps) => {
  return (
    <div className="code-item">
      <div className="code-title-wrapper">
        <div className="code-title">{"Encoded"}</div>
        <div className="code-desc">{"paste your token here".toUpperCase()}</div>
      </div>
      {children}
    </div>
  );
};
