import { defineStore } from 'pinia'; // Импорт функции defineStore из библиотеки Pinia. Эта функция используется для создания хранилища (store).
import type { Task } from '../types/task'; //тип Task описывает структуру задачи (например, id, text, completed).

export const useTodoStore = defineStore('todo', { //Создание хранилища с именем 'todo', useTodoStore — это функция, которая возвращает экземпляр хранилища.// defineStore принимает два аргумента: имя хранилища ('todo') и объект с его настройками (state, actions, getters).
    state: () => ({ // Функция, которая возвращает начальное состояние хранилища.
        tasks: [] as Task[], //tasks — массив задач. Каждая задача имеет тип Task.
        deletedTasks: [] as Task[],  // deletedTasks — массив удаленных задач.
        filter: 'all' as 'all' | 'completed' | 'incomplete' | 'deleted', //filter — текущий фильтр для отображения задач.Изначально установлен в 'all'
    }),
    actions: { //Действия — это методы, которые изменяют состояние хранилища.
        addTask(text: string) { //Добавляет новую задачу в массив tasks
            this.tasks.push({ id: Date.now(), text, completed: false });
        },
        removeTask(id: number) {
            const task = this.tasks.find(task => task.id === id); //находит задачу по id.
            if (task) {
                this.deletedTasks.push(task); 
                this.tasks = this.tasks.filter(task => task.id !== id);  //удаляет задачу из основного массива.
            }
        },
        restoreTask(id: number) {
            const task = this.deletedTasks.find(task => task.id === id);
            if (task) {
                this.tasks.push(task);
                this.deletedTasks = this.deletedTasks.filter(task => task.id !== id); 
            }
        },
        toggleTask(id: number) { // Переключает статус задачи (выполнена/не выполнена).
            const task = this.tasks.find(task => task.id === id);
            if (task) {
                task.completed = !task.completed; //меняет значение completed на противоположное.
            }
        },
        setFilter(filter: 'all' | 'completed' | 'incomplete' | 'deleted') { //станавливает текущий фильтр.
            this.filter = filter;
        },
        editTask(id: number, newTask: string) {
            const task = this.tasks.find(task => task.id === id);
            if (task) {
                task.text = newTask; // обновляет текст задачи.
            }
        },
    },
    getters: { // вычисляемые свойства, которые возвращают данные на основе состояния.
        filteredTasks: (state) => { //Возвращает отфильтрованный список задач в зависимости от текущего значения filter
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