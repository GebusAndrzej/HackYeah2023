import { AxiosInstance } from "axios";

export type Constructor<T = {}> = new (...args: any[]) => T;

export interface HttpClient {
    http: AxiosInstance
};