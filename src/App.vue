<template>
    <div class="main-container">
        <h1>ToDo List</h1>
        <task-input />
        <div class="tabs">
            <button @click="setFilter('all')" :class="{ active: filter === 'all' }">Все</button>
            <button @click="setFilter('completed')" :class="{ active: filter === 'completed' }">Выполненные</button>
            <button @click="setFilter('incomplete')" :class="{ active: filter === 'incomplete' }">Невыполненные</button>
        </div>
        <task-list />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useTodoStore } from './stores/todoStore';
import TaskInput from './components/TaskInput.vue';
import TaskList from './components/TaskList.vue';

export default defineComponent({
    components: { TaskInput, TaskList },
    setup() {
        const todoStore = useTodoStore();
        const filter = computed(() => todoStore.filter);

        const setFilter = (filter: 'all' | 'completed' | 'incomplete') => {
            todoStore.setFilter(filter);
        };

        return { filter, setFilter };
    },
});
</script>
