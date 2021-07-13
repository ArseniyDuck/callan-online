import React from 'react';


type TProps = { size: number };

const Spinner: React.FC<TProps> = ({ size }) => {
   return <div className='spinner' style={{ width: size, height: size }}></div>;
};

export default Spinner;
