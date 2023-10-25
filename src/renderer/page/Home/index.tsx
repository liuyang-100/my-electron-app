import React from 'react';
import { Button, Form, Input, Checkbox, Select, message } from 'antd';
import './styles.scss';
// eslint-disable-next-line import/order
import { defaultFilesName, filesName, groupNameList } from './mock';

const Index = () => {
  const CheckboxGroup = Checkbox.Group;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleClick = () => {
    const data = form.getFieldsValue();
    if (!localStorage.getItem('prototype_path')) {
      messageApi.open({
        type: 'error',
        content: '请配置prototype地址',
      });
    }
    console.log(
      data?.componentName,
      data?.groupName,
      JSON.stringify(data?.filesName),
      localStorage.getItem('prototype_path'),
    );
    window.electron.ipcRenderer.sendMessage('execute-script', [
      data?.componentName,
      data?.groupName,
      JSON.stringify(data?.filesName),
      localStorage.getItem('prototype_path'),
    ]);
  };

  type FieldType = {
    componentName: string;
    groupName: string;
    filesName: Array<string>;
  };

  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleClick}
        autoComplete="off"
        initialValues={{
          filesName: defaultFilesName,
        }}
      >
        <Form.Item<FieldType>
          label="ComponentName"
          name="componentName"
          rules={[{ required: true, message: '请输入新增组件名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="GroupName" name="groupName">
          <Select options={groupNameList} allowClear />
        </Form.Item>

        <Form.Item<FieldType>
          label="FilesName"
          name="filesName"
          rules={[
            { required: true, message: '请选择新增组件需要同步到的落地页' },
          ]}
        >
          <CheckboxGroup options={filesName} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Primary Button
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
