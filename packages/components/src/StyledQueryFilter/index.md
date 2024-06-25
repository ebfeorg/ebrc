---
nav: components
toc: content
---

# StyledQueryFilter

表单组件。封装的ant-design/pro-components

## 安装

```bash
npm install ebn-fe-components
```

## 使用

导入对应组件

```tsx | pure

```

## 代码演示

```tsx
import {
  ProFormDateRangePicker,
  ProFormText,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import { StyledQueryFilter } from 'ebn-fe-components';
import { useState } from 'react';

export default () => {
  const [state] = useState(1);
  const [searchForm] = Form.useForm();

  const onFinish = async (params) => {
    console.log(params);
  };
  const reset = () => {
    console.log('reset');
  };
  return (
    <StyledQueryFilter
      labelWidth={100}
      form={searchForm}
      onFinish={onFinish}
      onReset={reset}
    >
      <ProFormText label="项目名称" name="projectName" />
      <ProFormText label="企业名称" name="companyName" />
      <ProFormDateRangePicker label="服务日期范围" name="time" />
    </StyledQueryFilter>
  );
};
```

## 属性

| 属性名            | 说明                                          | 类型    | 默认值 |
| ----------------- | --------------------------------------------- | ------- | ------ |
| defaultColsNumber | 默认一行显示几个表单项                        | number  | 7      |
| defaultCollapsed  | 收缩                                          | boolean | false  |
| QueryFilterProps  | @ant-design/pro-components的 QueryFilterProps |
