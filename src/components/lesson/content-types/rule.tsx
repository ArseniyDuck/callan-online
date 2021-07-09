import React from 'react';
import { TRuleContent } from '../../../types/data-structures';


type TProps = Omit<TRuleContent, 'content_id'>;

const Rule: React.FC<TProps> = ({ page, text, index_number }) => {
   const pageObj = {'data-defore-content': page};

   return (
      <p className={page ? 'lesson__rule page-number' : 'lesson__rule'} {...pageObj}>
         {text}
      </p>
   );
};

export default Rule;