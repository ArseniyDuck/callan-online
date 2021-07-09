import React from 'react';
import { TQuestionContent } from '../../../types/data-structures';

type TProps = Omit<TQuestionContent, 'content_id'>;

const Question: React.FC<TProps> = ({ page, question_text, answer_text }) => {
   const pageObj = {'data-defore-content': page};

   return (
      <div className={page ? 'lesson__question-wrapper page-number' : 'lesson__question-wrapper'} {...pageObj}>
         <p className='lesson__question-text'>{question_text}</p>
         <p className='lesson__answer-text'>{answer_text}</p>
      </div>
   );
};

export default Question;