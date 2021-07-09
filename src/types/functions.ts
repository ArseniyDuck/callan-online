import { AxiosResponse } from 'axios';

export type THandleError = (message: string | null, response: AxiosResponse<any> | undefined) => void;