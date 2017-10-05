<template>
    <section class="app">
        <div class="head">
            Wakenator
        </div>
        <div class="body">body {{status}}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto quo nulla, enim error soluta tenetur inventore et nemo labore debitis, id tempore autem assumenda ipsum! Libero iure, nobis quam autem.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto quo nulla, enim error soluta tenetur inventore et nemo labore debitis, id tempore autem assumenda ipsum! Libero iure, nobis quam autem.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto quo nulla, enim error soluta tenetur inventore et nemo labore debitis, id tempore autem assumenda ipsum! Libero iure, nobis quam autem.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto quo nulla, enim error soluta tenetur inventore et nemo labore debitis, id tempore autem assumenda ipsum! Libero iure, nobis quam autem.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto quo nulla, enim error soluta tenetur inventore et nemo labore debitis, id tempore autem assumenda ipsum! Libero iure, nobis quam autem.
        </div>
        <div class="foot">foot</div>
    </section>
</template>

<script>
import io from 'socket.io-client'
import Debug from 'debug'

Debug.enable('*')

export default {
    data:()=>({
        packageVersion: process.env.PACKAGE_VERSION,
        status:'none'
    }),
    _created(){
        let socket = this.socket = io.connect('http://127.0.0.1:3001')
        // let socket = this.socket = io.connect('wss://wakenator-server.now.sh')

        socket.on('connect',()=>{
            this.status = 'connect'
        })
        socket.on('disconnect',()=>{
            this.status = 'disconnect'
        })
    }
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