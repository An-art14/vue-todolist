import { defineStore } from 'pinia'; 
import { useLocalStorage } from '../composable/useLocalStorage';
import type { Task } from '../types/task'; 

export const useTodoStore = defineStore('todo', { 
    state: () => ({ 
        tasks: useLocalStorage<Task[]>('tasks', []), 
        deletedTasks: useLocalStorage<Task[]>('deletedTasks', []), 
        filter: 'all' as 'all' | 'completed' | 'incomplete' | 'deleted', 
    }),
    actions: { 
        addTask(text: string) { 
            this.tasks.push({ id: Date.now(), text, completed: false });
        },
        removeTask(id: number) {
            const task = this.tasks.find(task => task.id === id); 
            if (task) {
                this.deletedTasks.push(task); 
                this.tasks = this.tasks.filter(task => task.id !== id);  
            }
        },
        restoreTask(id: number) {
            const task = this.deletedTasks.find(task => task.id === id);
            if (task) {
                this.tasks.push(task);
                this.deletedTasks = this.deletedTasks.filter(task => task.id !== id); 
            }
        },
        toggleTask(id: number) { 
            const task = this.tasks.find(task => task.id === id);
            if (task) {
                task.completed = !task.completed; 
            }
        },
        setFilter(filter: 'all' | 'completed' | 'incomplete' | 'deleted') { 
            this.filter = filter;
        },
        editTask(id: number, newTask: string) {
            const task = this.tasks.find(task => task.id === id);
            if (task) {
                task.text = newTask; 
            }
        },
    },
    getters: { 
        filteredTasks: (state) => { 
            switch(state.filter) {
                case 'completed':
                    return state.tasks.filter(task => task.completed);
                case 'incomplete':
                    return state.tasks.filter(task => !task.completed);
                case 'deleted':
                    return state.deletedTasks;
                default:
                    return state.tasks;
            }
        },
    },
});