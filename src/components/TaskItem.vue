<template>
    <transition name="zoom-out">
    <div v-if="!isRemoved" :class="{ completed: task.completed }" class="task-item">
        <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask"
            :disabled="isEditing"
            class="task-checkbox"
        />
        <input 
            v-if="isEditing"
            v-model="editedText"
            @keyup.enter="saveEdit"
            @blur="saveEdit"
            class="edit-input"
        />
        <span v-else class="task-text">{{ task.text }}</span>
        <button @click="startEdit" class="edit-button" v-if="!isEditing">✎</button>
        <button @click="removeTask" class="delete-button">х</button>
    </div>
    </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import type { Task } from '../types/task';

const props = defineProps<{
    task: Task;
}>();

const todoStore = useTodoStore();
const isEditing = ref(false);
const editedText = ref('');
const isRemoved = ref(false);

const toggleTask = () => {
    todoStore.toggleTask(props.task.id);
};

const removeTask = () => {
    isRemoved.value = true;
    setTimeout(() => {
        todoStore.removeTask(props.task.id);
    }, 200);
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
</script>