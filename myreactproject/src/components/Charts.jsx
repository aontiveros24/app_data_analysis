import React from 'react';
import { useGetSeverityCountQuery, useGetScatterDataQuery } from '../baseApi';

import { Col, Row, Tag } from 'antd';
import ReactECharts from 'echarts-for-react';

const Charts = () => {
    const { data: dataSeverity } = useGetSeverityCountQuery(undefined);

    const { data: dataScatter } = useGetScatterDataQuery(undefined);
    
    const colors = ['#EE6666', '#FC8452', '#73C0DE', '#91CC75', '#5470C6', '#FAC858', '#3BA272', '#9A60B4', '#EA7CCC'];

    const optionSeverityCount = (data) => ({
        title: {
          text: 'Vulnerabilities by Severity',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item.severity),
        },
        yAxis: {
          type: 'value',
        },
        series: [
            {
                name: 'Vulnerabilities',
                data: data.map((item, index) => ({
                value: item.count,
                itemStyle: {
                    color: colors[index % colors.length],
                },
                })),
                type: 'bar',
            },
        ],
    });

    const scatterOption = (data) => ({
        title: {
          text: 'Severity vs CVSS',
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => `Severity: ${params.value[0]}<br/>CVSS: ${params.value[1]}`,
        },
        xAxis: {
          type: 'category',
          data: [...new Set(data.map(item => item.severity))],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Severity vs CVSS',
            type: 'scatter',
            data: data.map(item => ({
                value: [item.severity, item.cvss],
            })),
          },
        ],
      });

      
    return (
        <Row>
            <Col span={12}>
                {dataSeverity && <ReactECharts option={optionSeverityCount(dataSeverity)} style={{ height: 400 }} />}
            </Col>
            <Col span={12}>
                {dataScatter && <ReactECharts option={scatterOption(dataScatter)} style={{ height: 400 }} />}
            </Col>
        </Row>
    );
};

export default Charts;