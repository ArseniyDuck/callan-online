import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import homeworkReducer from './homework-reducer'
import appReducer from './app-reducer';
import vocabularyReducer from './vocabulary-reducer';
import lessonReducer from './lesson-reducer';

const rootReducer = combineReducers({
   app: appReducer,
   homework: homeworkReducer,
   vocabulary: vocabularyReducer,
   lesson: lessonReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window['store'] = store

export type AppStateType = ReturnType<typeof rootReducer>;
export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;
export type BaseThunkType<A extends Action> = ThunkAction<Promise<void>, AppStateType, unknown, A>;

export default store;