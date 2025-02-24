<template>
    <div :class="{ completed: task.completed }" class="task-item">
        <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask"
            class="task-checkbox"
        />
        <span class="task-text">{{ task.text }}</span>
        <button @click="removeTask" class="delete-button">х</button>
        <div v-if="showRemove" class="remove">
            <div class="remove-content">
            <p class="delete">Задача удалена ✅</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
        const showRemove = ref(false);

        const toggleTask = () => {
            todoStore.toggleTask(props.task.id);
        };

        const removeTask = () => {
            todoStore.removeTask(props.task.id);
            showRemove.value = true;
            setTimeout(() =>  (showRemove.value = false), 1500);
        };

        return { toggleTask, removeTask, showRemove };
    },
});
</script>