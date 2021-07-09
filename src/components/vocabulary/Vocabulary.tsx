import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { fetchLessons } from '../../redux/vocabulary-reducer';
import { useWindowSize, useErrorHandling } from '../../tools/hooks';
import { getColumns } from '../../tools/functions';
import Spinner from '../Spinner';
import { TVocabularyLesson } from '../../types/data-structures';
import { THandleError } from '../../types/functions';


type TProps = TMapStateToProps & TMapDispatchToProps;

const Vocabulary: React.FC<TProps> = ({ fetchLessons, isFetching, lessons }) => {
   const { setError, errorText: { errorMessage, errorStatus } } = useErrorHandling();
   useEffect(() => { fetchLessons(setError); }, [fetchLessons, setError]);

   const windowDimensions = useWindowSize();

   let columns: 2 | 1 = 2;
   if (windowDimensions.width < 650) {
      columns = 1;
   }

   return (
      <main className='vocabulary'>
         <div className='container container_with-spinner'>
            <h1 className='vocabulary__heading page-heading'>VOCABULARY</h1>
            {isFetching ?
            // if fetching, show spinner
            <div className='center-container'><Spinner size={60} /></div>
            :
            // else if fetched with error
            errorMessage ?
            <div className='center-container'>
               <p className='error error_small'>{errorMessage}</p>
               <p className='error-status error-status_small'>{errorStatus}</p>
            </div>
            :
            // else show home tasks
            <div className='vocabulary__wrapper'>
               {getColumns<TVocabularyLesson>(columns, lessons, 'left-right').map((elem, index) => {
                  return <div key={index} className='vocabulary__column'>
                     {elem.map(elem => {
                        return <div key={elem.number}>
                           <Link to={`/lessons/${elem.number}`} className='vocabulary__lesson'>LESSON {elem.number}</Link>
                           {elem.words.map(elem => {
                              return <div key={elem.id} className='vocabulary__item'>
                                 <p className='vocabulary__page'>{elem.page}</p>
                                 <p className='vocabulary__english'>{elem.english_text}</p>
                                 <p className='vocabulary__dotts'></p>
                                 <p className='vocabulary__translation'>{elem.translation_text}</p>
                              </div>;
                           })}
                        </div>;
                     })}
                  </div>
               })}
            </div>
            }
         </div>
      </main>
   );
};


// Connect
type TMapStateToProps = { lessons: Array<TVocabularyLesson>, isFetching: boolean | null };

type TMapDispatchToProps = { fetchLessons: (handleError: THandleError) => void };

export default connect<TMapStateToProps, TMapDispatchToProps, unknown, AppStateType>(
   (state: AppStateType): TMapStateToProps => ({
      lessons: state.vocabulary.lessons,
      isFetching: state.vocabulary.isFetching
   }),
   { fetchLessons }
)(Vocabulary);