<template>
    <div>
        {{ greet }}
        <div class="button">hola</div>
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
@import "../styles/main";

body,html{
    width:100%;
    height: 100%;
    min-height: 100%;
    margin:0;
    padding: 0;
    overflow: hidden;
}
body{
    display: flex;
    // background-color: #fc0;
}
div{
    flex:1;
    // background-color: #ccc;
    text-align: center;
}
</style>