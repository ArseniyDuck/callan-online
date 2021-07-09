import React from 'react';
import { TIdiomContent } from '../../../types/data-structures';


type TProps = Omit<TIdiomContent, 'content_id'>;

const Idiom: React.FC<TProps> = ({ page, number, idiom_text, explaining_text, example_text }) => {
   const pageObj = {'data-defore-content': page};

   return (
      <div className={page ? 'lesson__idiom page-number' : 'lesson__idiom'} {...pageObj}>
         <p className='lesson__idiom-number'>Idiom {number}</p>
         <p className='lesson__idiom-text'>{idiom_text} = <span>{explaining_text}</span></p>
         <p className='lesson__idiom-example'>e.g. {example_text}</p>
      </div>
   );
};

export default Idiom;