<template>
  <div>
    <app-petty></app-petty>
  </div>
</template>
<script>
import pettycash from '../components/form_petty_cash'
export default {
  components: {
    'app-petty': pettycash
  },
  data () {
    return {}
  },
  beforeCreate () {
    var localjwt = localStorage.getItem('jwt')
    if (localjwt !== null) {
    } else {
      location.replace('/')
    }
  },
  created () {},
  metaInfo () {
    return {
      title: 'Petty Cash',
      titleTemplate: '%s - LPTT'
    }
  },
  mounted () {
    setInterval(this.checkExpire, 150000)
  },
  methods: {
    checkPermission () {
      if (JSON.parse(localStorage.getItem('jwt')) !== 'null') {
        console.log('login agian')
      } else {
        console.log('login agian 2')
      }
    },
    checkExpire () {
      console.log('check expire')
      if (Date.now() >= parseInt(localStorage.getItem('iat'), 10) + 600000) {
        console.log('10min')
        console.log('logout')
        localStorage.removeItem('iat')
        localStorage.removeItem('username')
        localStorage.removeItem('jwt')
        localStorage.removeItem('role')
        location.replace('/')
      } else {
        console.log('not expire')
      }
    }
  }
}
</script>
<style scoped>
</style>
