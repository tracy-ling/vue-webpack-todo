<template>
<div class="helper">
    <span class="left">{{unFinishedNum}} items left</span>
    <span v-for="state in states" :key="state" :class="[state, filter === state ? 'actived' : '']" @click="toggleFilter(state)">
        {{state}}
    </span>
    <span class="clear" @click="clearCompleted">clear completed</span>
</div>
</template>

<script>
    export default {
        name: "tabs",
        props: {
            filter: {
                type: String,
                required: true
            },
            todos: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                states: ['all', 'active', 'completed']
            }
        },
        computed: {
            unFinishedNum() {
                return this.todos.filter(todo => {
                    return todo.completed === false;
                }).length
            }
        },
        methods: {
            toggleFilter(state) {
                this.$emit('toggle', state)
            },
            clearCompleted() {
                this.$emit('clearAll')
            }
        }
    }
</script>

<style scoped>

</style>
