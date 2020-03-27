import axios from "axios";
import { ListModel } from "../model/ListModel";
import {BASE_URL} from "./ServicesConfig";

export type ListErrorType = "LIST_NOT_FOUND" | "SERVER_ERROR" | "INVALID_VERSION" | "UNHANDLED";

export class ListError extends Error {
    constructor(type: ListErrorType, id?: string,) {
        super(id);
        this.listErrorType = type;
    }
    public listErrorType: ListErrorType;
}

export const isListError = (error: any): error is ListError => (error as ListError).listErrorType !== undefined;

export class ListService {
    private static apiUrl = (path: string) =>  ListService.API_URL + path;

    private static API_URL = BASE_URL + "api/";
    private static LISTS_PATH = ListService.apiUrl("lists");

    static createList = async () => new Promise<ListModel>((resolve, reject) => {
        axios.post<ListModel>(ListService.LISTS_PATH, {})
            .then(response => resolve(response.data))
            .catch(error => ListService.commonListErrorHandling(error, reject));

    });

    static getList = (id: string) => new Promise<ListModel>((resolve, reject) => {
        axios.get<ListModel>(`${ListService.LISTS_PATH}/${id}`)
            .then(response => resolve(response.data))
            .catch(error => {
                if (error.response.status === 404) {
                    return reject(new ListError("LIST_NOT_FOUND", id))
                }
                return ListService.commonListErrorHandling(error, reject, id);
            })
    });

    static updateList = (id: string, list: ListModel) => new Promise<ListModel>((resolve, reject) => {
        axios.patch<ListModel>(`${ListService.LISTS_PATH}/${id}`, list)
            .then(response => resolve(response.data))
            .catch(error => {
                if (error.response.status === 409) {
                    return reject(new ListError("INVALID_VERSION", id))
                }
                return ListService.commonListErrorHandling(error, reject, id);
            })
    });

    private static commonListErrorHandling(error: any, reject: (reason?: any) => void, id?: string) {
        if (error.response.status > 500) {
            return reject(new ListError("SERVER_ERROR", id))
        }
        return reject(new ListError( "UNHANDLED", id))
    }
}