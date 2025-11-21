import React from 'react';

export interface Task {
    id: string;
    title: string;
    due: string;
    description: string;
    priority: 'high' | 'medium' | 'low' | 'at-risk';
}

export interface Meeting {
    title: string;
    time: string;
    preparation: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'alert' | 'info' | 'success';
}

export interface Mood {
    emoji: string;
    label: string;
}

export interface Event {
    id: string;
    name: string;
    venue: string;
    date: string;
    time: string;
    type: 'meeting' | 'deadline' | 'training' | 'social';
    attendees: number;
    status: 'upcoming' | 'ongoing' | 'completed';
}

export interface SummaryItem {
    id: string;
    category: string;
    count: number;
    change: number;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: string;
}