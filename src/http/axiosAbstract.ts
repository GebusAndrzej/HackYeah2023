import { AxiosInstance } from 'axios';
import axiosInstance from './axiosInstance';
import { IHttpClient } from './types';

export abstract class AHttpClient implements IHttpClient {
    http: AxiosInstance;

    constructor() {
        this.http = axiosInstance
    }
}
