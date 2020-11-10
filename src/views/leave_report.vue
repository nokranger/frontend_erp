<template>
  <div>
    <div>
      <b-container fluid="xl">
        <div style="font-size:30px;">
          Leave Form
        </div>
        <app-leave></app-leave>
      </b-container>
    </div>
  </div>
</template>
<script>
import leaveReport from '../components/form_leave_report'
export default {
  components: {
    'app-leave': leaveReport
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
  mounted () {
    setInterval(this.checkExpire, 150000)
  },
  metaInfo () {
    return {
      title: 'Leave Report',
      titleTemplate: '%s - LPTT'
    }
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
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
.align-left {
  text-align:left
}
.align-center {
  text-align: center;
}
div {
  font-family: 'Kanit', sans-serif;
}
</style>
