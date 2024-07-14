import { Card, Col, Descriptions, List, Row } from 'antd';
import React from 'react';

const Step3 = () => {
    
    const fieldDescriptions = [
        { label: 'Vendor Project', description: 'The name of the vendor project associated with the vulnerability. (String)' },
        { label: 'Product', description: 'The name of the product associated with the vulnerability. (String)' },
        { label: 'Vulnerability Name', description: 'The name of the vulnerability. (String)' },
        { label: 'Group', description: 'The group associated with the vulnerability. (String)' },
        { label: 'CWE', description: 'The Common Weakness Enumeration associated with the vulnerability. (String)' },
        { label: 'Vector', description: 'The vector associated with the vulnerability. (String)' },
        { label: 'Date Added', description: 'The date the vulnerability was added to the CISA Known Exploited Vulnerabilities catalog. (Date)' },
        { label: 'Due Date', description: 'The date by which the required action must be completed. (Date)' },
        { label: 'Publication Date', description: 'The date the vulnerability was published. (Date)' },
        // { label: 'Short Description', description: 'A brief description of the vulnerability. (String)' },
        // { label: 'Required Action', description: 'The action required to remediate the vulnerability. (String)' },
        // { label: 'Notes', description: 'Additional notes about the vulnerability. (String)' },
        { label: 'CVSS', description: 'The Common Vulnerability Scoring System score associated with the vulnerability. (Float)' },
        // { label: 'Complexity', description: 'The complexity associated with the vulnerability. (String)' },
        { label: 'Severity', description: 'The severity level associated with the vulnerability. (String)' }
    ];
    
    const half = Math.ceil(fieldDescriptions.length / 2);
    const firstHalf = fieldDescriptions.slice(0, half);
    const secondHalf = fieldDescriptions.slice(half);

    return (
        <Card style={{width: '100em' }}>
        <Row gutter={16}>
          <Col span={12}>
            <List
              bordered
              dataSource={firstHalf}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.label}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col span={12}>
            <List
              bordered
              dataSource={secondHalf}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.label}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Card>
    //     <List
    //     bordered
    //     dataSource={fieldDescriptions}
    //     renderItem={item => (
    //       <List.Item>
    //         <List.Item.Meta
    //           title={item.label}
    //           description={item.description}
    //         />
    //       </List.Item>
    //     )}
    //     style={{ width: '100em' }}
    //   />
    );
};

export default Step3;