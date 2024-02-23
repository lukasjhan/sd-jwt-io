import { ReactNode } from "react";

interface DebuggerContainerProps {
  children: ReactNode;
  headerText: string;
}

export const DebuggerContainer = ({
  children,
  headerText,
}: DebuggerContainerProps) => {
  return (
    <div className="code-item">
      <div className="code-title-wrapper">
        <div className="code-title">{headerText}</div>
        <div className="code-desc">{"paste your token here".toUpperCase()}</div>
      </div>
      {children}
    </div>
  );
};
