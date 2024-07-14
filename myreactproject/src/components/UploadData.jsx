import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useUploadCSVMutation } from '../baseApi';



const UploadData = () => {
    const [isUpload, setIsUpload] = useState(false);
    const [uploadCSV, { isLoading, error }] = useUploadCSVMutation();

    const handleUpload = ({ file }) => {
        if (file?.originFileObj && !isUpload) {
            setIsUpload(true)
            console.log("ENTRO", file?.originFileObj)
            const formData = new FormData();
            formData.append('file', file?.originFileObj);
    
            uploadCSV(formData)
            .unwrap()
            .then((response) => {
                console.log('File uploaded successfully:', response);
                message.success('File uploaded successfully');
                setIsUpload(false)
            })
            .catch((err) => {
                console.error('Error uploading file:', err);
                message.error('Error uploading file');
                setIsUpload(false)
            });
        }
    };

  const beforeUpload = (file) => {
    const isCSV = file.type === 'text/csv' || file.type === 'application/vnd.ms-excel';
    if (!isCSV) {
      message.error('You can only upload CSV file!');
    }
    return isCSV;
  };

    return (
        <div>
            <Upload maxCount={1} beforeUpload={beforeUpload} accept=".csv" onChange={handleUpload} customRequest={(info) => {}}>
                <Button icon={<UploadOutlined />}>Upload CSV</Button>
              </Upload>            
        </div>
    );
};

export default UploadData;