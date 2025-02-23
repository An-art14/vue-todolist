<template>
    <div class="task-entry">
        <input
            v-model="taskText"
            @keyup.enter="addTask"
            placeholder="Введите задачу"
            class="task-input"
        />
        <button @click="addTask" class="add-task-button">
            Добавить
        </button>
         <div v-if="showEmoji" class="emoji"> 
            <div class="emoji-content">
            <img src="../images/celebration.gif" alt="celebration" class="gif" />
            <p class="done">Задача добавлена  ✅</p>
            </div>
        </div>

        <div v-if="showModal" class="modal" :class="{ snake: showError }">
            <div class="modal-content">
                <p class="paragraph">⚠️  Введите задачу </p>
                <button @click="showModal = false">Закрыть</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '../stores/todoStore';

export default {
    setup() {
        const todoStore = useTodoStore();
        const taskText = ref('');
        const showModal = ref(false);
        const showError = ref(false);
        const showEmoji = ref(false);
        const gif = ref(false);

        const addTask = () => {
            if (taskText.value.trim()) {
                todoStore.addTask(taskText.value);
                taskText.value = '';
                showEmoji.value = true;
                gif.value = true;
                setTimeout(() => (gif.value = false), 1500);
                setTimeout(() => (showEmoji.value = false), 1500);
                showError.value = false;
            } else {
                showModal.value = true;
                showError.value = true;
                setTimeout(() => (showError.value = false), 400);
            }
        };

        return { taskText, addTask, showModal, showError, showEmoji };
    },
};
</script>
