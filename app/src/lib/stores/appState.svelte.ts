import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface AppState {
    dnd: boolean;
    calendarActions: boolean;
    panelPosition: { x: number; y: number };
    panelMinimized: boolean;
    calendarCards: boolean;
}

const COOKIE_NAME = 'appState';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 año

function getCookie(name: string): string | null {
    if (!browser) return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
}

function setCookie(name: string, value: string, maxAge: number) {
    if (!browser) return;
    document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function getInitialState(): AppState {
    if (!browser) {
        return { dnd: false, calendarActions: false, panelPosition: { x: 0, y: 0 }, panelMinimized: false, calendarCards: false };
    }
    
    const cookie = getCookie(COOKIE_NAME);
    if (cookie) {
        try {
            return JSON.parse(decodeURIComponent(cookie));
        } catch (e) {
            console.error('Error parsing appState cookie:', e);
        }
    }
    
    return { dnd: false, calendarActions: false, panelPosition: { x: 0, y: 0 }, panelMinimized: false, calendarCards: false };
}

function createAppState() {
    const { subscribe, set, update } = writable<AppState>(getInitialState());

    function saveToCookie(state: AppState) {
        if (browser) {
            setCookie(COOKIE_NAME, encodeURIComponent(JSON.stringify(state)), COOKIE_MAX_AGE);
        }
    }

    return {
        subscribe,
        toggleDnd: () => update(state => {
            const newState = { ...state, dnd: !state.dnd };
            saveToCookie(newState);
            return newState;
        }),
        toggleCalendarActions: () => update(state => {
            const newState = { ...state, calendarActions: !state.calendarActions };
            saveToCookie(newState);
            return newState;
        }),
        setDnd: (value: boolean) => update(state => {
            const newState = { ...state, dnd: value };
            saveToCookie(newState);
            return newState;
        }),
        setCalendarActions: (value: boolean) => update(state => {
            const newState = { ...state, calendarActions: value };
            saveToCookie(newState);
            return newState;
        }),
        setPanelPosition: (x: number, y: number) => update(state => {
            const newState = { ...state, panelPosition: { x, y } };
            saveToCookie(newState);
            return newState;
        }),
        resetPanelPosition: () => update(state => {
            const newState = { ...state, panelPosition: { x: 0, y: 0 } };
            saveToCookie(newState);
            return newState;
        }),
        togglePanelMinimized: () => update(state => {
            const newState = { ...state, panelMinimized: !state.panelMinimized };
            saveToCookie(newState);
            return newState;
        }),
        toggleMinimizedCalendarCards: () => update(state => {
            const newState = { ...state, calendarCards: !state.calendarCards };
            saveToCookie(newState);
            return newState;
        }),
        reset: () => {
            const newState = { dnd: false, calendarActions: false, panelPosition: { x: 0, y: 0 }, panelMinimized: false, calendarCards: false };
            saveToCookie(newState);
            set(newState);
        }
    };
}

export const appState = createAppState();