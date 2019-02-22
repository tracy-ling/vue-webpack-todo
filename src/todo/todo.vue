<template>
    <section class="real-app">
        <input type="text" class="add-ipt" autofocus="autofocus" placeholder="接下来要做什么？" @keyup.enter="addTodo">
        <Item :todo="todo" v-for="todo in filteredTodos" :keys="todo.id" @del="deleteTodo"></Item>
        <Tabs :filter="filter" :todos="todos" @toggle="toggleFilter" @clearAll="clearAllCompleted"></Tabs>
    </section>
</template>

<script>
    import Item from './item.vue';
    import Tabs from './tabs.vue';
    let id = 0;
    export default {
        name: "todo",
        data() {
            return {
                todos: [],
                filter: 'all'
            }
        },
        components: {
            Item,
            Tabs
        },
        computed: {
            filteredTodos () {
                if (this.filter === 'all') {
                    return this.todos;
                }
                const completed = this.filter === 'completed';
                return this.todos.filter(todo => {
                    return todo.completed === completed;
                })
            }
        },
        methods: {
            addTodo(e) {
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                });
                e.target.value = '';
            },
            deleteTodo(id) {
                this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
            },
            toggleFilter(state) {
                this.filter = state;
            },
            clearAllCompleted() {
                this.todos = this.todos.filter(todo => todo.completed === false);
            }
        }
    }
</script>

<style lang="css" scoped>
    .real-app {
        width: 600px;
        margin: 0 auto;
        -webkit-box-shadow: 0px 0px 5px #666;
        -moz-box-shadow: 0px 0px 5px #666;
        box-shadow: 0px 0px 5px #666;
    }
    .add-ipt {
        width: 100%;
        font-size: 24px;
        line-height: 1.4em;
        padding: 16px;
    }
</style>
