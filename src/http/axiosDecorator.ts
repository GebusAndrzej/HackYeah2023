import axiosInstance from "./axiosInstance";
import { Constructor } from "./types";

export function InjectHttp<T extends Constructor>(constructor: T) {
    return class extends constructor {
        http = axiosInstance;
    }
}