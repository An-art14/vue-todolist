<template>
    <div class="task-entry-container">
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
        </div>
         <div v-if="showEmoji" class="emoji"> 
            <div class="emoji-content">
            <img src="../images/cat_celebration.gif" alt="celebration" class="gif" />
            <p class="done">Задача добавлена  ✅</p>
            </div>
        </div>

        <div v-if="showModal" class="modal" :class="{ snake: showError }">
            <div class="modal-content">
                <img src="../images/error.jpg" alt="er" class="Error" />
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

        const resetStates = () => {
            showEmoji.value = false;
            showError.value = false;
        };

        const addTask = () => {
            if (taskText.value.trim()) {
                todoStore.addTask(taskText.value);
                taskText.value = '';
                showEmoji.value = true;
                setTimeout(resetStates, 1500);
            } else {
                showModal.value = true;
                showError.value = true;
                setTimeout(resetStates, 400);
            }
        };

        return { taskText, addTask, showModal, showError, showEmoji, };
    },
};
</script>
