import {BASE_URL} from "./ServicesConfig";

export class EventService {
    private static EVENTS_URL = BASE_URL + "events/";
    static getEventStream = (id: string) => new EventSource(EventService.EVENTS_URL + id)
}