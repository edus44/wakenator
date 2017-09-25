<template>
    <div>
        {{ greet }}
        <div class="button">hola</div>
        <div class="button">{{status}}</div>
    </div>
</template>

<script>
import io from 'socket.io-client'
import Debug from 'debug'

Debug.enable('*')

export default {
    data:()=>({
        greet:'hello',
        status:'none'
    }),
    created(){
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