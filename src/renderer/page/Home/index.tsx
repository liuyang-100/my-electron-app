import React from 'react';
import { Button } from 'antd';

const Index = () => {
  const handleClick = () => {
    window.electron.ipcRenderer.sendMessage('execute-script');
  };

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        Primary Button
      </Button>
    </div>
  );
};

export default Index;
