<template>
  <div class="message">
    <div class="message-person">
      <span class="host">{{ person.user }}@{{ person.host }}</span>
      <span class="name"> {{ person.name }} </span>
    </div>
    <div class="action">{{ action }}</div>
    <MessageImage/>
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
  .message-person {
    position: relative;

    .name {
      font-size: 44px;
      line-height: 56px;
      font-weight: bold;
    }
    .host {
      font-size: 14px;
      color: #aaa;
      position: absolute;
      top: -20px;
      left: 0;
      display: block;
    }
  }
  .action {
    font-size: 40px;
    line-height: 56px;
  }
}
</style>
