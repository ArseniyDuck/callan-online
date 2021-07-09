import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';

type TProps = {
   english_text: string
   translation_text: string
};

const Word: React.FC<TProps> = ({ english_text, translation_text }) => {
   const [wordClicked, setWordClicked] = useState(false);
   const className = wordClicked ? 'lesson__english-text _touched' : 'lesson__english-text';

   const wordOnClick = () => {
      if (isMobile) {
         setWordClicked(!wordClicked);
      }
   }

   return (
      <div className='lesson__word'>
         <p onClick={wordOnClick} className={className}>{english_text}
            <span className='lesson__translation-text'>{translation_text}</span>
         </p>
      </div>
   );
};

export default Word;