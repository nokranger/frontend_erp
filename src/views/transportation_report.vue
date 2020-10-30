<template>
  <div>
    <div>
    <b-container fluid="xl">
      <div style="font-size:30px;">
        Transportation Reimbursement Form
      </div>
      <app-trans></app-trans>
    </b-container>
    </div>
  </div>
</template>
<script>
import transreport from '../components/form_trans'
export default {
  components: {
    'app-trans': transreport
  },
  data () {
    return {}
  },
  metaInfo () {
    return {
      title: 'Transportation Reimbursement Form',
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
