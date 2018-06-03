<template>
  <div class="people">
    <template
      v-for="(person,idx) in people"
    >
      <Person 
        :person="person"
        :key="person.name"
      />
      <BaseRough
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
import BaseRough from '@/components/ui/BaseRough'

export default {
  components: { Person, BaseRough },
  data: () => ({
    people: [
      { name: 'pepe' },
      { name: 'lt-eduardo-hidalgo' },
      { name: 'natasha' },
      { name: 'pepito' },
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