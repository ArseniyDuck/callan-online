import { BaseThunkType, InferActionsType } from './store';
import { LessonAPI } from '../tools/api';
import { TLesson } from '../types/data-structures';
import { THandleError } from '../types/functions';


const initialState = {
   lessonData: {
      number: null,
      data: [],
      audio: null,
   } as TLesson,
   isFetching: false as boolean
};

const lessonReducer = (state = initialState, action: TAction): TInitialState => {
   switch (action.type) {
      case 'SET_LESSON':
         return {
            ...state,
            lessonData: action.lesson
         };
      case 'lesson/TOGGLE_IS_FETCHING':
         return {
            ...state,
            isFetching: action.bool
         }
      default:
         return state;
   }
};


// Action creators:
const actions = {
   setLesson: (lesson: TLesson) => ({ type: 'SET_LESSON', lesson } as const),
   toggleIsFetching: (bool: boolean) => ({ type: 'lesson/TOGGLE_IS_FETCHING', bool } as const),
};


// Thunks:
export const fetchLesson = (lessonNumber: string, handleError: THandleError): TThunk => async dispatch => {
   dispatch(actions.toggleIsFetching(true));
   const data = await LessonAPI.getLesson(lessonNumber, handleError);
   if (data != null) {
      dispatch(actions.setLesson(data));
   }
   dispatch(actions.toggleIsFetching(false));
}


// Types:
type TInitialState = typeof initialState;

type TAction = InferActionsType<typeof actions>;

type TThunk = BaseThunkType<TAction>;


// Export reducer:
export default lessonReducer;