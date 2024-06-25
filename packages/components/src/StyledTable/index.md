---
nav: components
toc: content
---

# StyledTable

封装的Antd 的Table。

- 统一默认增加偶数行背景色
- 处理 columns 的render方法。默认最宽230px（可通过table 的props maxCellWidth 修改,通过columns 的longTextWidth 覆盖），超出则出现tooltip。render 结果是React 组件的不做处理
- 默认分页配置，可覆盖
- 默认 scroll = `{{ x: 'max-content' }}`，可覆盖
- 默认 rowKey = id

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
import { Button } from 'antd';
import { StyledTable } from 'ebn-fe-components';

export default () => {
  const columns: any = [
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      longTextWidth: 360,
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (val, record, index) => record.startTime + '-' + record.endTime,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: (_, record: any) => {
        return (
          <>
            <Button type="link">新增</Button>
            <Button type="link">删除</Button>
          </>
        );
      },
    },
  ];
  const data = [
    {
      name: 'name1',
      address: '银河系太阳系地球亚洲中华人民共和国浙江省杭州市余杭区',
      startTime: '2024-6-18',
      endTime: '2024-6-20',
    },
    {
      name: 'name1',
      address: '银河系太阳系地球亚洲中华人民共和国浙江省杭州市余杭区',
      startTime: '2024-6-18',
      endTime: '2024-6-20',
    },
    {
      name: 'name1',
      address: '银河系太阳系地球亚洲中华人民共和国浙江省杭州市余杭区',
      startTime: '2024-6-18',
      endTime: '2024-6-20',
    },
    {
      name: 'name1',
      address: '银河系太阳系地球亚洲中华人民共和国浙江省杭州市余杭区',
      startTime: '2024-6-18',
      endTime: '2024-6-20',
    },
    {
      name: 'name1',
      address: '银河系太阳系地球亚洲中华人民共和国浙江省杭州市余杭区',
      startTime: '2024-6-18',
      endTime: '2024-6-20',
    },
    {
      name: 'name1',
      address: '银河系太阳系地球亚洲中华人民共和国浙江省杭州市余杭区',
      startTime: '2024-6-18',
      endTime: '2024-6-20',
    },
    {
      name: 'name1',
      address: '银河系太阳系地球亚洲中华人民共和国浙江省杭州市余杭区',
      startTime: '2024-6-18',
      endTime: '2024-6-20',
    },
    {
      name: 'name1',
      address: '银河系太阳系地球亚洲中华人民共和国浙江省杭州市余杭区',
      startTime: '2024-6-18',
      endTime: '2024-6-20',
    },
    {
      name: 'name1',
      address: '银河系太阳系地球亚洲中华人民共和国浙江省杭州市余杭区',
      startTime: '2024-6-18',
      endTime: '2024-6-20',
    },
    {
      name: 'name1',
      address: '银河系太阳系地球亚洲中华人民共和国浙江省杭州市余杭区',
      startTime: '2024-6-18',
      endTime: '2024-6-20',
    },
    {
      name: 'name1',
      address: '银河系太阳系地球亚洲中华人民共和国浙江省杭州市余杭区',
      startTime: '2024-6-18',
      endTime: '2024-6-20',
    },
  ];
  return (
    <StyledTable
      rowKey="id"
      maxCellWidth={100}
      columns={columns}
      dataSource={data}
    ></StyledTable>
  );
};
```

## 属性

| 属性名       | 说明                              | 类型   | 默认值 |
| ------------ | --------------------------------- | ------ | ------ |
| maxCellWidth | 一列文本最大宽度，超出出现tooltip | number | 230    |
| TableProps   | Antd 的TableProps                 |        |        |

### columns

| 属性名           | 说明                                                      | 类型   | 默认值 |
| ---------------- | --------------------------------------------------------- | ------ | ------ |
| longTextWidth    | 一列文本最大宽度，超出出现tooltip，会覆盖maxCellWidth的值 | number | 230    |
| TableColumnsType | Antd 的 TableColumnsType                                  |        |        |
