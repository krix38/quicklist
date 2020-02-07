import axios from "axios";
import { ListModel } from "../model/ListModel";
import {BASE_URL} from "./ServicesConfig";

export class ListService {
    private static apiUrl = (path: string) =>  ListService.API_URL + path;

    private static API_URL = BASE_URL + "api/";
    private static LISTS_PATH = ListService.apiUrl("lists");

    static createList = async () => new Promise<ListModel>(resolve => {
        axios.post<ListModel>(ListService.LISTS_PATH, {})
            .then(response => resolve(response.data));
    });

    static getList = (id: string) => new Promise<ListModel>(resolve => {
        axios.get<ListModel>(`${ListService.LISTS_PATH}/${id}`)
            .then(response => resolve(response.data));
    });

    static updateList = (id: string, list: ListModel) => new Promise<ListModel>(resolve => {
        axios.patch<ListModel>(`${ListService.LISTS_PATH}/${id}`, list)
            .then(response => resolve(response.data));
    });
}