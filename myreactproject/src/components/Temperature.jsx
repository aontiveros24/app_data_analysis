import React, { useEffect, useState } from 'react';
import CustomTable from './CustomTable';
import { useGetTemperatureQuery } from '../baseApi';
import TemperatureIcon from '../images/icons8-termómetro-96.png';
import { Col, Row, Tag } from 'antd';
import Title from 'antd/es/typography/Title';

import { Slider } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import ReactECharts from 'echarts-for-react';
import { getDateTime } from '../dates';

const marks = {
    0: '0°C',
    20: '20°C',
    37: '37°C',
    80: '80°C',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100°C</strong>,
    },
  };

const Temperature = () => {
    const [toastId, setToastId] = useState(null);
    const [defaultTemperature, setDefaultTemperature] = useState([20, 80]);
    const { data, error, isLoading } = useGetTemperatureQuery(undefined, {
        pollingInterval: 3000,
    });

    const onChangeComplete = (value) => {
        setDefaultTemperature(value)
        // console.log('onChangeComplete: ', value);
    };

    useEffect(() => {
        if(data){
            if(data[0].value < defaultTemperature[0] || data[0].value > defaultTemperature[1]){
              if (toastId) {
                toast.dismiss(toastId);
              }

              const newToastId = toast.error('Cuidado, temperatura fuera de Rango!', {
                    position: "top-left",
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
          
              if (value < defaultTemperature[0] || value > defaultTemperature[1]) {
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
      color: '#e46a76',
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
                    <Title>Temperatura</Title>    
                </Col>
                <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={TemperatureIcon} alt='icon' />
                    <Title>{data && `${data[0]?.value} ${data[0]?.unit}`}</Title>
                </Col>
                <Col span={24} style={{padding: '0 100px'}}>
                    <Slider onChangeComplete={onChangeComplete} range marks={marks} defaultValue={defaultTemperature} />
                </Col>
                <Col span={24}>
                  {data && <ReactECharts option={sortData(data)} style={{ height: '280px', marginBottom: '20px' }} />}
                </Col>
                <Col span={24}>
                    <CustomTable data={data} isLoading={isLoading} defaultColumns={columns}/>
                </Col>
            </Row>   

            <ToastContainer />
        </>
    );
};

export default Temperature;