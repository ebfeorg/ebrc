import type { TableProps } from 'antd';
import { Table, Typography } from 'antd';
import cls from 'classnames';
import { SetStateAction, isValidElement, useState } from 'react';
import './index.less';

const showTotal = (total: number) => `共 ${total} 条`;

export const PaginationCommonProps = {
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal,
};

export const TableCellText = (text, maxWidth = 230) => {
  const val = text || text === 0 ? text : '-';
  if (val === '-') return '-';
  return (
    <Typography.Text
      ellipsis={{
        tooltip: {
          color: '#fff',
          title: val,
          placement: 'topLeft',
          overlayInnerStyle: {
            color: '#000',
            width: maxWidth + 100,
            lineHeight: '22px',
            padding: '15px',
          },
        },
      }}
      style={{ maxWidth }}
    >
      {val}
    </Typography.Text>
  );
};

export default function (props: TableProps<any> & { maxCellWidth?: number }) {
  const { columns, pagination, maxCellWidth = 230, ...rest } = props;
  const _columns = columns?.map((item: any) => {
    return {
      ...item,
      ellipsis: false,
      render: (val, record, index) => {
        const renderVal = item.render ? item.render(val, record, index) : val;
        return isValidElement(renderVal)
          ? renderVal
          : TableCellText(renderVal, item.longTextWidth || maxCellWidth);
      },
    };
  });
  return (
    <Table
      rowKey="id"
      rowClassName={(record, index, indent) => {
        const gapClass = index % 2 === 1 ? 'styledTableBgColor' : '';
        const origin =
          typeof props?.rowClassName === 'string'
            ? props?.rowClassName
            : props?.rowClassName?.(record, index, indent);
        return cls(gapClass, origin);
      }}
      scroll={{ x: 'max-content' }}
      columns={_columns}
      pagination={
        pagination
          ? {
              ...PaginationCommonProps,
              ...pagination,
            }
          : pagination
      }
      {...rest}
    />
  );
}

export const useRowSelection = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: SetStateAction<any[]>, rows: SetStateAction<any[]>) => {
      setSelectedRowKeys(keys);
      setSelectedRows(rows);
    },
  };

  const onRow = (record: { id: any }) => ({
    onClick: () => {
      if (selectedRowKeys.includes(record.id)) {
        setSelectedRowKeys(selectedRowKeys.filter((key) => key !== record.id));
        setSelectedRows(selectedRows.filter((item) => item.id !== record.id));
      } else {
        setSelectedRowKeys([...selectedRowKeys, record.id]);
        setSelectedRows([...selectedRows, record]);
      }
    },
  });

  const clearRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  return {
    selectedRowKeys,
    selectedRows,
    setSelectedRowKeys,
    setSelectedRows,
    rowSelection,
    onRow,
    clearRows,
  };
};
