<template>
    <div>
        <transition-group name="zoom-out" tag="div"
        enter-active-class=""
        leave-active-class="animate__animated animate__zoomOut">
            <task-item
                v-for="task in filteredTasks"
                :key="task.id"
                :task="task"
                class="task-item"
            />
        </transition-group>   
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