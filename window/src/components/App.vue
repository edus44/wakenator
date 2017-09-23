<template>
    <div>
        {{ greet }}
    </div>
</template>

<script>
export default {
    data:()=>({
        greet:'hello'
    }),
    created(){
        console.log(this.greet)
    }
}
</script>

<style lang="scss">
@import '~bulma';
</style>