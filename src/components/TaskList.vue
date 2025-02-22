<template>
    <div>
        <task-item
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            class="task-item"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import TaskItem from './TaskItem.vue';

export default defineComponent({
    components: { TaskItem },
    setup() {
        const todoStore = useTodoStore();
        const filteredTasks = computed(() => todoStore.filteredTasks);
        return { filteredTasks };
    },
});
</script>