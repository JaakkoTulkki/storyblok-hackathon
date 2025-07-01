import { ReactNode } from 'react';

interface ValidationErrorProps {
  error: string;
  children: ReactNode;
  title?: string;
}

export function ValidationError({ error, children, title = "Validation Error" }: ValidationErrorProps) {
  return (
    <div className="validation-error-wrapper">
      <div className="validation-error-badge">
        <span className="error-icon">⚠️</span>
        <span className="error-text">{title}: {error}</span>
      </div>
      <div className="validation-error-content">
        {children}
      </div>
    </div>
  );
} 