import React from 'react';
import { Descriptions } from 'antd';

import ArquitecturaIcon from '../images/arquitectura.png';

const Step2 = () => {
    const items = [
        {
            key: '1',
            label: 'Universidad',
            children: 'UISEK',
        },
        {
          key: '2',
          label: 'Estudiante',
          children: 'Andres Ontiveros',
        },
        {
          key: '3',
          label: 'Semestre',
          children: '4to',
        },
        {
          key: '4',
          label: 'Materia',
          children: 'Sistemas Embebidos',
        },
        {
            key: '5',
            label: 'Profesor',
            children: 'Phd Diego Bustamante',
        }                
      ];

    return (
        <>
            <br />
            <img src={ArquitecturaIcon} alt='arquitectura'></img>
            {/* <Descriptions title="Bienvenido, este es mi proyecto Final" bordered layout="vertical" items={items} /> */}
        </>
    );
};

export default Step2;