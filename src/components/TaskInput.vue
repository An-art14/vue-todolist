<template>
    <div class="task-entry">
        <input
            v-model="taskText"
            @keyup.enter="addTask"
            placeholder="Введите задачу"
            class="task-input"
        />
        <button @click="addTask" class="add-task-button">Добавить</button>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '../stores/todoStore';

export default {
    setup() {
        const todoStore = useTodoStore();
        const taskText = ref('');

        const addTask = () => {
            if (taskText.value.trim()) {
                todoStore.addTask(taskText.value);
                taskText.value = '';
            } else {
                alert('Введите задачу!');
            }
        };

        return { taskText, addTask };
    },
};
</script>
