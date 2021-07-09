import { BaseThunkType, InferActionsType } from './store';
import { VocabularyAPI } from '../tools/api';
import { TVocabularyLesson } from '../types/data-structures';
import { THandleError } from '../types/functions';


const initialState = {
   lessons: [] as Array<TVocabularyLesson>,
   isFetching: false as boolean,
};

const vocabularyReducer = (state = initialState, action: TAction): TInitialState => {
   switch (action.type) {
      case 'SET_LESSONS':
         return {
            ...state,
            lessons: action.lessons
         };
      case 'vocabulary/TOGGLE_IS_FETCHING':
         return {
            ...state,
            isFetching: action.bool
         };
      default:
         return state;
   }
};


// Action creators:
const actions = {
   setLessons: (lessons: Array<TVocabularyLesson>) => ({ type: 'SET_LESSONS', lessons } as const),
   toggleIsFetching: (bool: boolean) => ({ type: 'vocabulary/TOGGLE_IS_FETCHING', bool } as const)
};


// Thunks:
export const fetchLessons = (handleError: THandleError): TThunk => async dispatch => {
   dispatch(actions.toggleIsFetching(true));
   const data = await VocabularyAPI.getVocabulary(handleError);
   if (data) {
      dispatch(actions.setLessons(data))
   }
   dispatch(actions.toggleIsFetching(false));
}


// Types:
type TInitialState = typeof initialState;

type TAction = InferActionsType<typeof actions>;

type TThunk = BaseThunkType<TAction>;


// Export reducer:
export default vocabularyReducer;