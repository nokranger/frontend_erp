<template>
<div v-if="localjwt == 0">
  <b-tabs content-class="mt-3" align="center">
    <b-tab title="Pending">
      <app-approve></app-approve>
    </b-tab>
    <b-tab title="History">
      <app-history></app-history>
    </b-tab>
  </b-tabs>
</div>
<div v-else-if="localjwt == 1">
  <app-user></app-user>
</div>
</template>
<script>
import apiURL from '../assets/js/connectionAPI'
import approve from '../components/approve_trans'
import history from '../components/history_approve_trans'
import user from '../components/approve_transportation_user'
// import transuser from '../components/approve_transportation_user'
export default {
  components: {
    'app-approve': approve,
    'app-history': history,
    'app-user': user
  },
  data () {
    return {
      apiURL: apiURL,
      event: [],
      approve: [],
      rejects: [],
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10
    }
  },
  metaInfo () {
    return {
      title: 'Approve Transportation',
      titleTemplate: '%s - LPTT'
    }
  },
  beforeCreate () {
    var localjwt = localStorage.getItem('jwt')
    if (localjwt !== null) {
    } else {
      location.replace('/')
    }
  },
  created () {
    this.localjwt = JSON.parse(localStorage.getItem('role'))
    // console.log('local', (this.localjwt))
    if (this.localjwt === '0') {
      console.log('localtrans', (this.localjwt))
    }
  },
  updated () {},
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
