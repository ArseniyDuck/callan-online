import { BaseThunkType, InferActionsType } from './store';
import { HomeWorkAPI } from '../tools/api';
import { addZero } from '../tools/functions';
import { TTask } from '../types/data-structures';
import { THandleError } from '../types/functions';


const initialState = {
   tasks: [] as Array<TTask>,
   isFetching: null as boolean | null,
};

const homeworkReducer = (state = initialState, action: TAction): TInitialState => {
   switch (action.type) {
      case 'ADD_HOME_TASKS':
         return {
            ...state,
            tasks: action.tasks
         };
      case 'homework/TOGGLE_IS_FETCHING':
         return {
            ...state,
            isFetching: action.bool
         };
      case 'DECREMENT_TASK_TIME_LEFT':
         return {
            ...state,
            tasks: state.tasks.map(elem => {
               if (elem.id === action.id && elem.time_left !== null) {
                  const parts = elem.time_left.split(' days, ');
                  if (parts.length === 2) {
                     // If `d days, hh:mm`
                     const d: number = +parts[0];
                     const h: number = +parts[1].split(':')[0];
                     const m: number = +parts[1].split(':')[1];

                     if (d === 1 && h === 0 && m === 0) {
                        return {
                           ...elem,
                           time_left: '23:59',
                        }
                     }

                     if (h === 0 && m === 0) {
                        return {
                           ...elem,
                           time_left: `${d - 1} days, 23:59`,
                        }
                     }

                     if (m === 0) {
                        return {
                           ...elem,
                           time_left: `${d} days, ${addZero(h - 1)}:59`,
                        }
                     }

                     return {
                        ...elem,
                        time_left: `${d} days, ${addZero(h)}:${addZero(m - 1)}`,
                     }
                  } else {
                     // If `hh:mm`
                     const h: number = +elem.time_left.split(':')[0];
                     const m: number = +elem.time_left.split(':')[1];

                     if (h === 0 && m === 0) {
                        return {
                           ...elem,
                           time_left: null,
                           is_completed: true,
                        }
                     }

                     if (m === 0) {
                        return {
                           ...elem,
                           time_left: `${addZero(h - 1)}:59`,
                        }
                     }

                     return {
                        ...elem,
                        time_left: `${addZero(h)}:${addZero(m - 1)}`,
                     }
                  }
               } return elem;
            })
         };
      default:
         return state;
   }
};


// Action creators:
export const actions = {
   addHomeWork: (tasks: Array<TTask>) => ({ type: 'ADD_HOME_TASKS', tasks} as const),
   toggleIsFetching: (bool: boolean) => ({ type: 'homework/TOGGLE_IS_FETCHING', bool } as const),
   decrementTaskTimeLeft: (id: number) => ({ type: 'DECREMENT_TASK_TIME_LEFT', id } as const)
};


// Thunks:
export const fetchHomeWork = (handleError: THandleError): TThunk => async dispatch => {
   dispatch(actions.toggleIsFetching(true));
   const data = await HomeWorkAPI.getHomeWork(handleError);
   if (data) {
      dispatch(actions.addHomeWork(data));
   }
   dispatch(actions.toggleIsFetching(false));
};


// Types:
type TInitialState = typeof initialState;

type TAction = InferActionsType<typeof actions>;

type TThunk = BaseThunkType<TAction>;


// Export reducer:
export default homeworkReducer;