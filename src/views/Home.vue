<template>
  <div class="home" v-bind:style="{background: color, padding: '50px 0'}">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      color: 'lightgreen'
    }
  }
}
</script>
