<template>
    <div :class="['todo-item', todo.completed ? 'completed' : '']">
        <input type="checkbox" class="toggle" v-model="todo.completed">
        <label>{{todo.content}}</label>
        <button class="destory" @click="deleteTodo">X</button>
    </div>
</template>

<script>
    export default {
        name: "item",
        props: {
            todo: {
                required: true,
                type: Object
            }
        },
        methods: {
            deleteTodo() {
                this.$emit('del', this.todo.id);
            }
        }
    }
</script>

<style lang="css" scoped>
    .todo-item {

    }
    .completed {

    }
    .toggle {

    }
    .destory {

    }
</style>
