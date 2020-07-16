<template>
  <div id="app" v-bind:style="{background: colors, width: '100%', height: heights}">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <div v-if="pathname === 'login'">
    </div>
    <div v-else>
      <app-header></app-header>
    </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
import Header from './components/header'
export default {
  components: {
    'app-header': Header
  },
  data () {
    return {
      colorlptt: '#29265b',
      colors: 'radial-gradient(circle, rgba(20,94,238,0.6867121848739496) 0%, rgba(173,245,255,1) 100%)',
      heights: '1000px',
      pathname: ''
    }
  },
  mounted () {
    console.log(window.location.pathname)
    if (window.location.pathname === '/') {
      this.pathname = 'login'
      console.log('login')
    } else if (window.location.pathname === '/print') {
      // var pp = window.location.pathname
      // var res = pp.split(' / ')
      // console.log(typeof(pp))
      this.colorlptt = 'white'
      console.log('login')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #29265b;;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
body, html {
  padding: 0;
  margin: 0;
  width: auto;
  height: 100%;
}
</style>
