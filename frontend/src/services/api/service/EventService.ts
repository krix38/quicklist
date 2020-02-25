import {BASE_URL} from "./ServicesConfig";


export class EventService {
    private static EVENTS_URL = BASE_URL + "events/";
    private static eventSources: { [id: string]: EventSource } = {};

    static closeAllEventSources = () =>
        Object
            .keys(EventService.eventSources)
            .map(id => EventService.eventSources[id])
            .forEach(eventService => eventService.close());

    static createEventSource = (id: string) => {
        EventService.eventSources[id] = new EventSource(EventService.EVENTS_URL + id)
    };

    static getEventSource = (id: string) => EventService.eventSources[id];
}