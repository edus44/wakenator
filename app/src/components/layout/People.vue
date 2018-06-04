<template>
  <div class="people">
    <template
      v-for="(person,idx) in people"
    >
      <Person 
        :person="person"
        :key="person.name"
      />
      <Rough
        v-if="idx < people.length-1"
        :key="person.name+'line'"
        :width="200"
        :height="10"
        :render="rc=>rc.line(10, 5, 190, 5, { stroke: 'white', roughness: 1 })"
        class="line"
      />
    </template>
  </div>
</template>

<script>
import Person from '@/components/layout/Person'
import Rough from '@/components/ui/Rough'

export default {
  components: { Person, Rough },
  data: () => ({
    people: [
      { name: 'pepe' },
      { name: 'lt-eduardo-hidalgo' },
      { name: 'natasha' },
      { name: 'pepitodsf' },
      { name: 'somebody' },
      { name: 'ber' },
      { name: 'no' },
      { name: 'pepitodsdfsf' },
      { name: 'pesdspe' },
      { name: 'lt-edsauardo-hidalgo' },
      { name: 'natashasdfa' },
      { name: 'pepitoasd' },
    ],
  }),
}
</script>

<style lang="scss">
@import '~@/assets/style/constants.scss';

.people {
  text-align: center;
  > .line {
    display: block;
    margin: 0 auto;
  }
}
</style>