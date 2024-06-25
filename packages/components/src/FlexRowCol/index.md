---
nav: components
toc: content
---

# FlexRowCol

自动适配宽度的 Row Col 容器

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
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { FlexRowCol } from 'ebn-fe-components';

export default () => {
  return (
    <ProForm layout="vertical">
      <FlexRowCol>
        <ProFormText label="保单编号" name={'policyNo'} />
        <ProFormText label="关联保单" />
        <ProFormText label="保险机构名称" name={'orgName'} />
        <ProFormText label="保险机构编码" />
        <ProFormText label="投保人名称" name={'applicantName'} />
        <ProFormText label="被保险人" name={'insurantName'} />
        <ProFormText label="保单起止期" name={'startDateAndEndDate'} />
        <ProFormText label="基准费率" />
        <ProFormText label="费率调整因子" />
        <ProFormText label="保险费" name={'premiumAmount'} />
        <ProFormText label="保险金额" name={'insuranceAmount'} />
      </FlexRowCol>
    </ProForm>
  );
};
```

## 属性

| 属性名   | 说明                                         | 类型     | 默认值       |
| -------- | -------------------------------------------- | -------- | ------------ |
| width    | 组件基准宽度，一行会计算该宽度来决定放多少列 | number   | 250          |
| colProps | col 组件的属性,同 antd Col 的 colProps       | ColProps | { span: 12 } |
| gutter   | 间距，同 antd Col 的 gutter                  | number[] | [24, 0]      |
