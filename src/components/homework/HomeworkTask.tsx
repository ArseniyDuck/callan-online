import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { actions } from '../../redux/homework-reducer';
import { TTask } from '../../types/data-structures';


type TProps = TMapDispatchToProps & TOwnProps;

const HomeworkTask: React.FC<TProps> = ({ id, theme, is_completed, text, deadline, time_left, decrementTaskTimeLeft }) => {
   useEffect(() => {
      const intervalId = setInterval(() => {
         decrementTaskTimeLeft(id);
      }, 60000);

      if (is_completed) {
         clearInterval(intervalId);
      }

      return () => {
         clearInterval(intervalId);
      };
   }, [id, is_completed, decrementTaskTimeLeft]);
   
   return (
      <div className='homework__item'>
         <h3 className='homework__theme'>{theme}</h3>
         <p className='homework__description'>{text}</p>
         <div className='homework__state'>
            <span className={is_completed ? 'homework__date homework__date_completed' : 'homework__date'}>{deadline}</span>
            {is_completed && <span className='homework__completed'>Completed</span>}
            {time_left && <span className='homework__time-left'>Time left: {time_left}</span>}
         </div>
      </div>
   );
};

// Connect
type TMapDispatchToProps = { decrementTaskTimeLeft: (id: number) => void };

type TOwnProps = TTask;

export default connect<unknown, TMapDispatchToProps, unknown, AppStateType>(
   null,
   { decrementTaskTimeLeft: actions.decrementTaskTimeLeft }
)(HomeworkTask);