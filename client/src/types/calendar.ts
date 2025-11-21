export interface CalendarEvent {
    id: string;
    summary: string;
    description?: string;
    start: {
        dateTime: string;
        timeZone?: string;
    };
    end: {
        dateTime: string;
        timeZone?: string;
    };
    location?: string;
    attendees?: Array<{
        email: string;
        displayName?: string;
    }>;
}

export interface NewEvent {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    attendees: string;
}