import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { fetchHomeWork } from '../../redux/homework-reducer';
import { useErrorHandling, useWindowSize } from '../../tools/hooks';
import { getColumns } from '../../tools/functions';
import Spinner from '../Spinner';
import HomeworkTask from './HomeworkTask';
import { TTask } from '../../types/data-structures';
import { THandleError } from '../../types/functions';


type TProps = TMapStateToProps & TMapDispatchToProps;

const Homework: React.FC<TProps> = ({ fetchHomeWork, ...props }) => {
   const { setError, errorText: { errorMessage, errorStatus } } = useErrorHandling();
   useEffect(() => { fetchHomeWork(setError); }, [fetchHomeWork, setError]);

   const windowDimensions = useWindowSize();

   let columns: 3 | 2 | 1 = 3;
   if (windowDimensions.width < 910) {
      columns = 2;
   }
   if (windowDimensions.width < 600) {
      columns = 1;
   }

   return (
      <main className='homework'>
         <div className='container container_with-spinner'>
            <h1 className='homework__heading page-heading'>HOMEWORK</h1>
            {props.isFetching ?
            // if fetching, show spinner
            <div className='center-container'>
               <Spinner size={60} />
            </div>
            :
            // else if fetched with error
            errorMessage ?
            <div className='center-container'>
               <p className='error error_large'>{errorMessage}</p>
               <p className='error-status error-status_large'>{errorStatus}</p>
            </div>
            :
            // else show home tasks
            <div className='homework__wrapper'>
               {getColumns<TTask>(columns, props.tasks).map((elem, index) => {
                  return <div key={index} className='homework__column'>
                     {elem.map(elem => <HomeworkTask key={elem.id} {...elem} />)}
                  </div>
               })}
            </div>
            }
         </div>
      </main>
   );
};

// Connect
type TMapStateToProps = { tasks: Array<TTask>, isFetching: boolean | null };

type TMapDispatchToProps = { fetchHomeWork: (handleError: THandleError) => void };

export default connect<TMapStateToProps, TMapDispatchToProps, unknown, AppStateType>(
   (state: AppStateType): TMapStateToProps => ({
      tasks: state.homework.tasks,
      isFetching: state.homework.isFetching
   }),
   { fetchHomeWork }
)(Homework);