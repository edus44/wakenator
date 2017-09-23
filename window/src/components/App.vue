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
body,html{
    background-color: transparent;
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
    padding: 6px;
}
div{
    flex:1;
    background-color: #ccc;
    border-radius: 6px;
    text-align: center;
    box-shadow: 0 0 6px 2px rgba(0,0,0,.2)
}
</style>