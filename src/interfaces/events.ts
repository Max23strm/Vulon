export enum eventTypeName {
    Quinces = 'Torneo 15s',
    Entrenamiento = 'Entrenamiento',
    Sevens = 'Torneo 7s',
    Tens = 'Torneo 10s',
}


export interface generalEvent {
    date: string
    event_name: string
    event_state: '1' | '2' | '0'
    event_type_uid: string
    event_uid: string
    type_name: eventTypeName.Entrenamiento | eventTypeName.Quinces | eventTypeName.Sevens | eventTypeName.Tens
}

export interface eventType {
    event_type_uid: string
    event_type_name: eventTypeName.Entrenamiento | eventTypeName.Quinces | eventTypeName.Sevens | eventTypeName.Tens
}

export interface GoogleEventsResponse {
    events:    GoogleEvent[];
    isSuccess: boolean;
    mensaje?: string;
    errors?: string
}



export interface Event {
    event_uid:        string;
    event_type_uid:   string;
    date_start:       string;
    date_end:         string;
    time_zone:        string;
    event_name:       string;
    type_name:        string;
    event_state:      string;
    event_state_type: number;
}



export interface GoogleEvent {
    end:        Date;
    event_type: string;
    google_id:  string;
    kind:       string;
    link:       string;
    location:   string;
    start:      Date;
    summary:    string;
}

export interface GoogleResponseEvent{
    created: Date,
    eventType: string,
    htmlLink: string,
    kind: string,
    location: string,
    start: Date,
    status: string,
    summary: string,
}
