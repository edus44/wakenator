<template>
  <div class="who">
    <div class="host">{{ person.user }}@{{ person.host }}</div>
    <div class="message">
      <span class="name"> {{ person.name }} </span>
      <div class="action">{{ action }}</div>
      <MessageImage/>
    </div>
  </div>
</template>

<script>
import MessageImage from './MessageImage'

const actions = ['needs you']
function getAction() {
  return actions[Math.floor(Math.random() * actions.length)]
}
export default {
  components: { MessageImage },
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    action: getAction(),
  }),
}
</script>

<style lang="scss">
.who {
  .host {
    font-size: 14px;
    color: #aaa;
    position: absolute;
    top: 60px;
    left: 70px;
    display: block;
  }
  .message {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 101;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .name {
      font-size: 44px;
      line-height: 56px;
      font-weight: bold;
    }
    .action {
      font-size: 40px;
      line-height: 56px;
    }
  }
}
</style>
