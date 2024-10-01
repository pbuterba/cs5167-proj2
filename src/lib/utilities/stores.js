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

/**
 * Flyout store
 */
const flyoutStore = writable(new Map());

function open(id) {
    flyoutStore.update((map) => {
        map.set(id, true);
        return map;
    });
}

function close(id) {
    flyoutStore.update((map) => {
        map.delete(id);
        return map;
    });
}

function toggle(id) {
    flyoutStore.update((map) => {
        map.set(id, !map.get(id));
        return map;
    });
}

export { close, flyoutStore, open, toggle };

