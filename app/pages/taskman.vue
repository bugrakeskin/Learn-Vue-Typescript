<template>
  <div class="taskman">
    <form @submit.prevent="addTask">
      <!-- Adding tasks form -->
      <input ref="newTaskInput" placeholder="Add new task" v-model="newTask" />
      <select v-model="newPriority">
        <option disabled value="">Select priority</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>

    <!-- Task filtering -->
    <input v-model="filteredText" placeholder="Filter tasks..." />

    <!-- If there no tasks -->
    <h3>Your Tasks</h3>

    <div v-if="filteredTasks.length === 0">
      <p>No tasks found. Try changing the filter or add some tasks!</p>
    </div>
    <div v-else>
      <!-- This is a list of tasks -->
      <div
        :class="{
          'line-through': task.done,
          'opacity-50': task.done,
          'text-red-200': task.priority === 'High',
          'text-yellow-200': task.priority === 'Medium',
          'text-green-200': task.priority === 'Low',
        }"
        class="flex gap-2"
        v-for="(task, index) in filteredTasks"
        :key="Number(task.id)"
      >
        <!-- Is task done? -->
        <input type="checkbox" v-model="task.done" />
        <!-- Task description -->

        <span> {{ task.description }}</span>

        <!-- Removing a task -->
        <button @click="removeTask(index)" class="remove-button">✖</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
import { type Tasks } from "~~/types/global";

const newTaskInput = ref();
const newTask = ref("");
const newPriority = ref("");
const tasks = reactive<Tasks[]>([]);
const filteredText = ref("");
// Initialize tasks from localStorage only on the client-side
onMounted(() => {
  newTaskInput.value.focus();

  if (typeof window !== "undefined") {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      tasks.push(...JSON.parse(storedTasks));
    }
  }
});

// Add new task to the list
const addTask = () => {
  if (newTask.value !== "" && newPriority.value !== "") {
    tasks.unshift({
      id: tasks.length + 1,
      description: newTask.value,
      priority: newPriority.value as "High" | "Medium" | "Low",
      done: false,
    });
    newTask.value = "";
    newPriority.value = "";
  }
};
const filteredTasks = computed(() => {
  return tasks.filter((task) =>
    task.description.toLowerCase().includes(filteredText.value.toLowerCase())
  );
});

const removeTask = (index: number) => {
  tasks.splice(index, 1);
};
// Watch for changes in the tasks array and save to localStorage
watch(
  tasks,
  () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  },
  { deep: true }
);
</script>

<style>
.taskman {
  @apply dark:bg-gray-700 p-4 text-black dark:text-white;
}
</style>
