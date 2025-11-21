import React from 'react';

export interface Task {
    id: string;
    title: string;
    due: string; // mapped from deadline in Dashboard.tsx or formatted string
    description: string; // mapped from details
    priority: 'high' | 'medium' | 'low' | 'at-risk';
    status?: string; // Added status field from DB
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
    is_read?: boolean; // Added is_read field from DB
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