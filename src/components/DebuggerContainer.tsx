import { Alert } from 'antd';
import { ReactNode } from 'react';

interface DebuggerContainerProps {
  children: ReactNode;
  headerText: string;
  descriptionText: string;
  isValid: boolean;
}

export const DebuggerContainer = ({ children, headerText, descriptionText, isValid }: DebuggerContainerProps) => {
  return (
    <div className="code-item">
      <div className="code-title-wrapper">
        <div className="code-title">{headerText}</div>
        <div className="code-desc">{descriptionText}</div>
        <div style={{ marginLeft: 'auto' }}>
          {!isValid && (
            <Alert
              style={{
                width: '100%',
                fontSize: '0.8rem',
                padding: '1px 8px',
              }}
              showIcon
              message="Unable to process due to wrong data format"
              type="error"
            />
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
