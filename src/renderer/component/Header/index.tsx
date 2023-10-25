import React, { useRef, useState } from 'react';
import { SettingTwoTone } from '@ant-design/icons';
import './styles.scss';
import { Drawer, Input, InputRef, message } from 'antd';

const Index = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      {contextHolder}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          padding: '0 20px',
        }}
      >
        <SettingTwoTone onClick={showDrawer} />
      </div>

      <Drawer
        title="setting"
        placement="right"
        onClose={onClose}
        open={open}
        destroyOnClose={false}
      >
        <Input
          ref={inputRef}
          placeholder="输入prototype工程地址"
          title="prototype"
          defaultValue={localStorage.getItem('prototype_path') ?? ''}
          onPressEnter={() => {
            const value = inputRef?.current?.input?.value;
            if (value) {
              localStorage.setItem('prototype_path', value);
              messageApi.open({
                type: 'success',
                content: '保存成功',
              });
            }
          }}
        />
      </Drawer>
    </div>
  );
};

export default Index;
