import { defineStore } from 'pinia';

export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export const useTodoStore = defineStore('todo', {
    state: () => ({
        tasks: [] as Task[],
        filter: 'all' as 'all' | 'completed' | 'incomplete',
    }),
    actions: {
        addTask(text: string) {
            this.tasks.push({ id: Date.now(), text, completed: false });
        },
        removeTask(id: number) {
            this.tasks = this.tasks.filter(task => task.id !== id);
        },
        toggleTask(id: number) {
            const task = this.tasks.find(task => task.id === id);
            if (task) {
                task.completed = !task.completed;
            }
        },
        setFilter(filter: 'all' | 'completed' | 'incomplete') {
            this.filter = filter;
        },
    },
    getters: {
        filteredTasks: (state) => {
            if (state.filter === 'completed') {
                return state.tasks.filter(task => task.completed);
            } else if (state.filter === 'incomplete') {
                return state.tasks.filter(task => !task.completed);
            }
            return state.tasks;
        },
    },
});