---
nav: components
toc: content
---

# TabSearchTools

封装的 Antd 的 Tab 组件，配合搜索表单和表格使用

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
import { Form } from 'antd';
import { TabSearchTools } from 'ebn-fe-components';
import { useState } from 'react';

export default () => {
  const [state] = useState(1);
  const [searchForm] = Form.useForm();

  const onChangeTab = async (params) => {
    console.log(params);
  };

  return (
    <TabSearchTools
      options={[
        { label: '待处理', value: '1' },
        { label: '查看', value: '2' },
      ]}
      alias={{ value: 'key' } as any}
      onChange={onChangeTab}
    />
  );
};
```

## props

```typescript
type TabSearchToolOption = any; //TabsProps['items'][0];
type OptionAliasMap<T> = {
  [key in keyof T]: keyof TabSearchToolOption;
};
type TTabSearchToolsProps<T = any> = {
  options: T[]; //tab 的 items
  alias?: OptionAliasMap<T>; // 把options的数据转化 `{ value: 'key' }` 把value 转成 key
  onChange: (activeKey: string) => any;
  tabsProps?: TabsProps;
};
```
