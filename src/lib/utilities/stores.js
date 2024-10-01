import { writable } from 'svelte/store';

function createMousePositionStore(initValues) {
    const { subscribe, set } = writable(initValues);

    if (typeof window !== 'undefined') {
        function updatePosition(e) {
            set({ x: e.clientX, y: e.clientY });
        }

        window.addEventListener('mousemove', updatePosition);

        const cleanup = () => window.removeEventListener('mousemove', updatePosition);

        return {
            subscribe,
            cleanup,
        };
    }
    return { subscribe };
}

export const mousePosition = createMousePositionStore({ x: 0, y: 0 });