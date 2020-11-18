<template>
  <div id="app" v-bind:style="cssProps">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <div v-if="pathname === 'login'">
    </div>
    <div v-else>
      <app-header></app-header>
    </div>
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
      imagecolor: 'linear-gradient(to top, #051937, #0a4066, #006c96, #009cc3, #12cfeb)',
      // background-image: linear-gradient(to bottom, #051937, #0a4066, #006c96, #009cc3, #12cfeb);
      heights: '1020px',
      pathname: '',
      cssProps: {
        background: 'radial-gradient(circle, rgba(20,94,238,0.6867121848739496) 0%, rgba(173,245,255,1) 100%)',
        width: '100%',
        maxWidth: '100%',
        backgroundPosition: 'center',
        height: '1020px',
        backgroundSize: 'cover'
      }
    }
  },
  mounted () {
    console.log(window.location.pathname)
    if (window.location.pathname === '/') {
      this.pathname = 'login'
      console.log('login')
    } else if (window.location.pathname === '/dashboard') {
      this.cssProps.height = 'auto'
    } else if (window.location.pathname === '/print') {
      this.colorlptt = 'white'
      console.log('login')
    } else if (window.location.pathname === '/approveleave') {
      this.cssProps.height = '1270px'
    } else if (window.location.pathname === '/approvetrans') {
      this.cssProps.height = '1270px'
    } else if (window.location.pathname === '/approvepettycash') {
      this.cssProps.height = '1270px'
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
