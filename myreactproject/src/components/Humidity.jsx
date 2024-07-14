import React, { useEffect, useState } from 'react';
import CustomTable from './CustomTable';
import { useGetHumidityQuery } from '../baseApi';
import HumidityIcon from '../images/icons8-higrómetro-96.png';
import Title from 'antd/es/typography/Title';
import { Col, Row, Slider, Tag } from 'antd';
import { toast } from 'react-toastify';
import ReactECharts from 'echarts-for-react';
import { getDateTime } from '../dates';

const marks = {
    0: '0%',
    40: '40%',
    60: '60%',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100%</strong>,
    },
  };

const Humidity = () => {
    const [toastId, setToastId] = useState(null);
    const [defaultHumidity, setDefaultHumidity] = useState([40, 80]);
    const { 
        data,
        isLoading,
        isFetching,
    } = useGetHumidityQuery(undefined, {
        pollingInterval: 3000
    });

    const onChangeComplete = (value) => {
        setDefaultHumidity(value)
    };

    useEffect(() => {
        if(data){
            if(data[0].value < defaultHumidity[0] || data[0].value > defaultHumidity[1]){
                if (toastId) {
                    toast.dismiss(toastId);
                }

                const newToastId = toast.info('Cuidado, Humedad fuera de Rango!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setToastId(newToastId);
            }          
        }
    }, [data]);

    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'date',
            key: 'date',
            render: (date) => getDateTime(date),
        },
        {
            title: 'Valor',
            dataIndex: 'value',
            key: 'value',
            render: (value) => {
              let color = 'green';
          
              if (value < defaultHumidity[0] || value > defaultHumidity[1]) {
                color = 'volcano';
              }
          
              return (
                <span>
                  <Tag color={color} key={value}>
                    {value}
                  </Tag>
                </span>
              );
            },
          },
        {
            title: 'Unidad',
            dataIndex: 'unit',
            key: 'unit',
        },
    ]

    const sortData = (data) => {
      const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

      return options(sortedData)
    }
    
    const options = (data) => ({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
          textStyle: {
            fontSize: 12,
            color: 'white',
          },
          backgroundColor: 'rgb(107 106 106)',
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            axisLabel: { color: 'rgb(136, 136, 136)', fontSize: 12 },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: true, lineStyle: { color: 'white' } },
            data: data.map((item) => item?.date),
        },
        yAxis: {
            type: 'value',
            axisLabel: { color: 'rgb(136, 136, 136)', fontSize: 12 },
            axisLine: { show: false },
            axisTick: { show: false },
            splitNumber: 3,
            splitLine: {
              show: true,
              lineStyle: { color: '#e0e0e0' },
            },
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100,
            minValueSpan: 1,
          },
          {
            start: 0,
            end: 10,
            minValueSpan: 1,
            height: 15,
            bottom: 5,
          },
        ],
        series: [{
            data: data.map((item) => item?.value),
            type: 'line'
        }]
      });
  

    return (
        <>
            <Row>
                <Col span={24} style={{textAlign: 'center'}}>
                    <Title>Humedad</Title>    
                </Col>
                <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={HumidityIcon} alt='icon' />
                    <Title>{data && `${data[0]?.value} ${data[0]?.unit}`}</Title>
                </Col>
                <Col span={24} style={{padding: '0 100px'}}>
                    <Slider onChangeComplete={onChangeComplete} range marks={marks} defaultValue={defaultHumidity} />
                </Col>
                <Col span={24}>
                  {data && <ReactECharts option={sortData(data)} style={{ height: '280px', marginBottom: '20px' }} />}
                </Col>
                <Col span={24}>
                    <CustomTable data={data} isLoading={isLoading} defaultColumns={columns}/>
                </Col>                
            </Row>
        </>
    );
};

export default Humidity;