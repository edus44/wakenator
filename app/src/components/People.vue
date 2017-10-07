<template>
    <div>
        {{ people }}
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    computed:{
        ...mapState('people',['people'])
    }
}
</script>

<style lang="scss">

</style>