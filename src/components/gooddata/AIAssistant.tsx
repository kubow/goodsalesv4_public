import React from 'react';
import { GenAIAssistant } from '@gooddata/sdk-ui-gen-ai';
import { GoodDataWrapper } from './GoodDataWrapper';

interface AIAssistantProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  className = '',
  width = 500,
  height = 600,
}) => {
  return (
    <GoodDataWrapper>
      <div 
        className={`ai-assistant-container ${className}`}
        style={{ 
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <GenAIAssistant />
      </div>
    </GoodDataWrapper>
  );
};

export default AIAssistant;
