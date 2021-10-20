import axios, { AxiosError } from 'axios';
import { TTask } from '../types/data-structures';
import { TLesson } from '../types/data-structures';
import { TVocabularyLesson } from '../types/data-structures';
import { THandleError } from '../types/functions';

const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://callan-online-backend.herokuapp.com/',
})

export const HomeWorkAPI = {
   haveHomeWork() {
      type TResponse = { have_homework: boolean };
      return instance.get<TResponse>('have_homework/')
         .then(response => response.status === 200 ? response.data : null);
   },

   getHomeWork (handleError: THandleError) {
      return instance.get<Array<TTask>>('homework/')
         .then(response => {
            if (response.status === 200) {
               handleError(null, undefined);
               return response.data
            } else {
               return null;
            }
         })
         .catch((error: AxiosError) => handleError(error.message, error.response));
   },
};


export const VocabularyAPI = {
   getVocabulary(handleError: THandleError) {
      type TResponse = Array<TVocabularyLesson>;
      return instance.get<TResponse>('vocabulary/')
         .then(response => {
            if (response.status === 200) {
               handleError(null, undefined);
               return response.data
            } else {
               return null;
            }
         })
         .catch((error: AxiosError) => handleError(error.message, error.response));
   }
};


export const LessonAPI = {
   getLesson(lessonNumber: string, handleError: THandleError) {
      return instance.get<TLesson>(`lesson/${lessonNumber}/`)
         .then(response => {
            if (response.status === 200) {
               handleError(null, undefined);
               return response.data
            } else {
               return null;
            }
         })
         .catch((error: AxiosError) => handleError(error.message, error.response));
   },

   getLessonsNumbers() {
      type TResponse = Array<{number: number, is_current: boolean}>;
      return instance.get<TResponse>('lesson_list/')
         .then(response => response.status === 200 ? response.data : null);
   }
};
