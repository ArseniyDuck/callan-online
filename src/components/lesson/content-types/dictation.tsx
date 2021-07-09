import React from 'react';
import { TDictationContent } from '../../../types/data-structures';
import dictationImage from '../../../images/dictation.jpg';


type TProps = TDictationContent;

const Dictation: React.FC<TProps> = ({ number, text }) => {
   return (
      <div className='lesson__dictation dictation'>
         <div className='dictation__header'>
            <img src={dictationImage} alt='dictation' className='dictation__image' />
            <p className='dictation__number'>Dictation {number}</p>
         </div>
         <p className='dictation__text'>{text}</p>
      </div>
   );
};

export default Dictation;