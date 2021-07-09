import React from 'react';
import { TGroupOfWordsContent } from '../../../../types/data-structures';
import Word from './word';


type TProps = Omit<TGroupOfWordsContent, 'content_id'>;

const GroupOfWords: React.FC<TProps> = ({ page, columns_count, theme_words_set, words }) => {
   const pageObj = {'data-defore-content': page};
   let className = `lesson__words-wrapper lesson__words-wrapper_${columns_count}-set`;
   if (page) className += ' page-number';

   return (
      <div className={className} {...pageObj}>
         {theme_words_set.map(elem => (
            <div key={elem.id} className='lesson__word lesson__word_theme'>
               <p>{elem.text}</p>
            </div>
         ))}
         {words.map(elem => (
            <Word key={elem.id} {...elem} />
         ))}
      </div>
   );
};

export default GroupOfWords;