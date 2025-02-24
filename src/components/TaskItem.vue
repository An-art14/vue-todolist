<template>
    <div :class="{ completed: task.completed }" class="task-item">
        <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask"
            class="task-checkbox"
        />
        <input 
            v-if="isEditing"
            v-model="editedText"
            @keyup.enter="saveEdit"
            @blur="saveEdit"
            class="edit-input"
        />
        <span v-else @dblclick="startEdit" class="task-text">{{ task.text }}</span>
        <button @click="removeTask" class="delete-button">х</button>
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
        const isEditing = ref(false);
        const editedText = ref('');

        const toggleTask = () => {
            todoStore.toggleTask(props.task.id);
        };

        const removeTask = () => {
            todoStore.removeTask(props.task.id);
        };

        const startEdit = () => {
            isEditing.value = true;
            editedText.value = props.task.text;
        };

        const saveEdit = () => {
            if (editedText.value.trim()) {
                todoStore.editTask(props.task.id, editedText.value);
            } 
            isEditing.value = false;
        };

        return { toggleTask, removeTask, isEditing, editedText, startEdit, saveEdit };
    },
});
</script>