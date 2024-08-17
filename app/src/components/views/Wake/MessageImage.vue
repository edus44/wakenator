<template>
  <div class="message-image">
    <img v-if="image" :src="image" />
    <Rough
      :width="300"
      :height="300"
      :render="
        rc =>
          rc.rectangle(10, 10, 280, 280, {
            stroke: 'transparent',
            fill: 'white',
            fillWeight: 0.2,
            hachureGap: 8,
            hachureAngle: 90,
            roughness: 2,
          })
      "
    />
  </div>
</template>

<script>
import Rough from '@/components/ui/Rough'

const tags = ['attention+seeker', 'wake+up', 'listen+to+me']
function getTag() {
  return tags[Math.floor(Math.random() * tags.length)]
}

export default {
  components: { Rough },
  data: () => ({
    image: '',
  }),
  created() {
    this.loadImage()
  },
  methods: {
    async loadImage() {
      const res = await fetch(
        'http://api.giphy.com/v1/gifs/random?api_key=4ApXtggHE6OgVhsuhvGyD4MQQHqRLW9t&tag=' + getTag()
      )
      const body = await res.json()
      this.image = body.data.images.original.url
    },
  },
}
</script>

<style lang="scss">
.message-image {
  margin-top: 20px;
  width: 300px;
  height: 300px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  img {
    max-width: 250px;
    max-height: 250px;
    display: block;
  }
}
</style>
