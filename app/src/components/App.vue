<template>
    <section class="app">
        <div class="head">
            Wakenator
        </div>
        <div class="body">
            <People></People>
            
        </div>
        <div class="foot">
            <Footer></Footer>
        </div>
    </section>
</template>

<script>
import {mapActions} from 'vuex'
import Footer from './Footer'
import People from './People'

export default {
    data:()=>({
        
    }),
    methods:{
        ...mapActions('people',['connect'])
    },
    created(){
        this.connect('http://127.0.0.1:13370')
    },
    components:{Footer,People}
}
</script>

<style lang="scss">
@import "../styles/main";


section.app{
    display: flex;
    flex-direction:column;
    height: 100vh;
    .head{
        font-family:'ScriptMT';
        color: $orange;
        font-size: 3.5rem;
        background-color: $dark;
        text-align: center;
        padding:.5rem 0;
    }
    .body{
        flex:1;
        overflow: auto;
    }
    .foot{
        background-color: $dark;
    }
}


// body,html{
//     width:100%;
//     height: 100%;
//     min-height: 100%;
//     margin:0;
//     padding: 0;
//     overflow: hidden;
// }
// body{
//     display: flex;
//     // background-color: #fc0;
// }
// div{
//     flex:1;
//     // background-color: #ccc;
//     text-align: center;
// }
</style>