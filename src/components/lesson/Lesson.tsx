import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { useErrorHandling } from '../../tools/hooks';
import { fetchLesson } from '../../redux/lesson-reducer';
import { THandleError } from '../../types/functions';
import Spinner from '../Spinner';
import Question from './content-types/question';
import Rule from './content-types/rule';
import GroupOfWords from './content-types/group-of-words/group-of-words';
import Idiom from './content-types/idiom';
import Dictation from './content-types/dictation';


type PathParamsType = { lessonNumber: string }

type TProps = RouteComponentProps<PathParamsType> & TMapStateToProps & TMapDispatchToProps;

const Lesson: React.FC<TProps> = ({fetchLesson, match: {params: {lessonNumber}}, ...props}) => {
   const { setError, errorText: { errorMessage, errorStatus } } = useErrorHandling();
   useEffect(() => { fetchLesson(lessonNumber, setError); }, [fetchLesson, lessonNumber, setError]);

   return (
      <main className='lesson'>
         <div className='container container_with-spinner'>
            {props.isFetching ?
            // if fetching, show spinner
            <div className='center-container'>
               <Spinner size={60} />
            </div>
            :
            // else if fetched with error
            (errorMessage) ?
            <div className='center-container'>
               <p className='error error_small'>{errorMessage}</p>
               <p className='error-status error-status_small'>{errorStatus}</p>
            </div>
            :
            // else show lesson data
            <>
               <h1 className='lesson__heading page-heading'>LESSON {lessonNumber}</h1>
               {props.lessonData.map(elem => {
                  switch (elem.content_type) {
                     case 'Question':
                        const { content_id: q_content_id, ...questionProps } = elem.content;
                        return <Question key={q_content_id} {...questionProps} />;

                     case 'Rule':
                        const { content_id: r_content_id, ...ruleProps } = elem.content;
                        return <Rule key={r_content_id} {...ruleProps} />;

                     case 'GroupOfWords':
                        const { content_id: g_content_id, ...groupProps } = elem.content;
                        return <GroupOfWords key={g_content_id} {...groupProps} />;

                     case 'Idiom':
                        const { content_id: i_content_id, ...idiomProps } = elem.content;
                        return <Idiom key={i_content_id} {...idiomProps} />;

                     case 'Dictation':
                        if (elem.content !== null) {
                           return <Dictation key={elem.content.text} {...elem.content} />;
                        } return null;
                     default:
                        return null;
                  }
               })
               }
               {/* if lesson has audiofile, show it */}
               {/* {props.audio && <audio className='lesson__audio' controls src={`http://localhost:8000${props.audio}`}></audio>} */}
            </>
            }
         </div>
      </main>
   );
};


// HOCS
const mapStateToProps = (state: AppStateType) => ({
   lessonNumber: state.lesson.lessonData.number,
   lessonData: state.lesson.lessonData.data,
   isFetching: state.lesson.isFetching,
   audio: state.lesson.lessonData.audio,
});

export default compose<React.ComponentType>(
   withRouter,
   connect<TMapStateToProps, TMapDispatchToProps, unknown, AppStateType>(
      mapStateToProps, { fetchLesson }
   ),
)(Lesson);


// Types:
type TMapStateToProps = ReturnType<typeof mapStateToProps>;

type TMapDispatchToProps = { fetchLesson: (lessonNumber: string, handleError: THandleError) => void };
