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
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodoStore } from '../stores/todoStore';
import TaskItem from './TaskItem.vue';

export default defineComponent({
    components: { TaskItem },
    setup() {
        const todoStore = useTodoStore();
        const { filteredTasks } = storeToRefs(todoStore);
        return { filteredTasks };
    },
});
</script>