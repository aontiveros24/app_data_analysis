import React from 'react';
import { Table } from 'antd';
import { getDateTime } from '../dates';

const columns = [
    {
        title: 'Fecha del registro',
        dataIndex: 'date',
        key: 'date',
        render: (date) => { 
            console.log(date)
            return getDateTime(date)
        },
    },
    {
        title: 'Valor',
        dataIndex: 'value',
        key: 'value',
    },
    {
        title: 'Unidad',
        dataIndex: 'unit',
        key: 'unit',
    },
]

const CustomTable = ({data, isLoading, defaultColumns=columns}) => {
    return (
        <Table columns={defaultColumns} dataSource={data} loading={isLoading} />
    );
};

export default CustomTable;