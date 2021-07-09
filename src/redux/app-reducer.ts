import { InferActionsType, BaseThunkType } from './store';
import { HomeWorkAPI, LessonAPI } from '../tools/api';


const initialState = {
   hasNotCompletedTask: false as boolean,
   lessonsNumbers: [] as TLessonsNumbers
};

const appReducer = (state = initialState, action: TAction): TInitialState => {
   switch (action.type) {
      case 'SET_HAS_NOT_COMPLETED_TASK':
         return {
            ...state,
            hasNotCompletedTask: action.bool
         };
      case 'SET_LESSONS_NUMBERS':
         return {
            ...state,
            lessonsNumbers: action.lessonsNumbers
         }
      default:
         return state;
   }
};


// Action creators:
const actions = {
   setHasNotCompletedTask: (bool: boolean) => ({ type: 'SET_HAS_NOT_COMPLETED_TASK', bool } as const),
   setLessonsNumbers: (lessonsNumbers: TLessonsNumbers) => ({ type: 'SET_LESSONS_NUMBERS', lessonsNumbers } as const),
};


// Thunks:
export const init = (): TThunk => async (dispatch) => {
   const haveHomeWorkData = await HomeWorkAPI.haveHomeWork();
   if (haveHomeWorkData) {
      dispatch(actions.setHasNotCompletedTask(haveHomeWorkData.have_homework));
   }

   const lessonsNumbersData = await LessonAPI.getLessonsNumbers();
   if (lessonsNumbersData) {
      dispatch(actions.setLessonsNumbers(lessonsNumbersData));
   }
};


// Types:
type TInitialState = typeof initialState;

type TAction = InferActionsType<typeof actions>;

type TThunk = BaseThunkType<TAction>;

export type TLessonsNumbers = Array<{number: number, is_current: boolean}>;


// export reducer
export default appReducer;