<template>
<div id="app">
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
</div>
</template>

<script>
    import Header from './todo/header.vue';
    import Footer from './todo/footer.jsx';
    import Todo from './todo/todo.vue';
    export default {
        components: {
            Header,
            Footer,
            Todo
        },
        name: "app",
        data () {
            return {
                text: '123'
            }
        }
    }
</script>

<style scoped>

</style>
