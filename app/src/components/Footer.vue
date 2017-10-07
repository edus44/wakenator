<template>
    <div>
        {{ connected }}
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    computed:{
        ...mapState('people',['connected'])
    }
}
</script>

<style lang="scss">

</style>