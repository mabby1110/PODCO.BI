import { updated } from "$app/state";

export function draggable(node: HTMLElement, data: any) {
    let state = data;
    node.draggable = true;
    node.style.cursor = 'grab';

    function handle_dragstart(e: any) {
        e.dataTransfer.setData('text/plain', state);
    }

    node.addEventListener('dragstart', handle_dragstart);

    return {
        update(data: any) {
            state = data;
        },
        destroy() {
            node.removeEventListener('dragstart', handle_dragstart);
        }
    }
}

export function dropzone(node: HTMLElement, options: any) {
    let state = {
        dropEffect: 'move',
        dragoverClass: 'droppable',
        ...options
    }

    function handle_dragenter(e: any) {
        e.target.classList.add(state.dragoverClass);
    }

    function handle_dragleave(e: any) {
        e.target.classList.remove(state.dragoverClass);
    }

    function handle_dragover(e: any) {
        e.preventDefault();
        e.dataTransfer.dropEffect = state.dropEffect;
    }

    function handle_drop(e: any) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        e.target.classList.remove(state.dragoverClass);
        if (state.on_dropzone) {
            state.on_dropzone(data, e);
        }
    }

    node.addEventListener('dragenter', handle_dragenter);
    node.addEventListener('dragleave', handle_dragleave);
    node.addEventListener('dragover', handle_dragover);
    node.addEventListener('drop', handle_drop);

    return {
        update(options: any) {
            state = {
                dropEffect: 'move',
                dragoverClass: 'droppable',
                ...options
            }
        },
        destroy() {
            node.removeEventListener('dragenter', handle_dragenter);
            node.removeEventListener('dragleave', handle_dragleave);
            node.removeEventListener('dragover', handle_dragover);
            node.removeEventListener('drop', handle_drop);
        }
    }
}