import React from 'react';


type TProps = { size: number };

const Spinner = ({ size }: TProps) => {
   return <div className='spinner' style={{ width: size, height: size }}></div>;
};

export default Spinner;