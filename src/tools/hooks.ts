import { useCallback, useEffect, useState } from 'react';
import { THandleError } from '../types/functions';


// useWindowSize -------------
export type TWindowSize = {
   width: number
   height: number
};

export const useWindowSize = (): TWindowSize => {
   function getWindowDimensions(): TWindowSize {
      const { innerWidth: width, innerHeight: height } = window;
      return { width, height };
   };
   
   const [windowDimensions, setWindowDimensions] = useState<TWindowSize>(getWindowDimensions());

   useEffect(() => {
      const handleResize = () => {
         setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return windowDimensions;
};


// useErrorHandling -------------
export const useErrorHandling = () => {
   const [errorMessage, setErrorMessage] = useState<string | null>(null);
   const [errorStatus, setErrorStatus] = useState<string | number | null>(null);

   const setError = useCallback<THandleError>((message, response) => {
      setErrorMessage(message);
      setErrorStatus(response ? response.statusText : 'server is not responding');
   }, []);

   return { errorText: { errorMessage, errorStatus }, setError };
}