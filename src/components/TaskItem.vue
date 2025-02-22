<template>
    <div :class="{ completed: task.completed }" class="task-item">
        <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask"
            class="task-checkbox"
        />
        <span class="task-text">{{ task.text }}</span>
        <button @click="removeTask" class="delete-button">Удалить</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import type { Task } from '../stores/todoStore';

export default defineComponent({
    props: {
        task: {
            type: Object as () => Task,
            required: true,
        },
    },
    setup(props) {
        const todoStore = useTodoStore();

        const toggleTask = () => {
            todoStore.toggleTask(props.task.id);
        };

        const removeTask = () => {
            todoStore.removeTask(props.task.id);
        };

        return { toggleTask, removeTask };
    },
});
</script>