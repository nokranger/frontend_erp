<template>
  <div>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S" crossorigin="anonymous">
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" v-on:click="openNav ()">&times;</a>
      <a class="align-left" href="/dashboard"><i class="fas fa-home"></i> Home</a>
      <a class="align-left" href="/record"><i class="fas fa-file-alt"></i> Record</a>
      <!-- <a class="align-left" href="/transreport"><i class="fas fa-file-alt"></i> Transportation record</a>
      <a class="align-left" href="/pettycash"><i class="fas fa-file-alt"></i> Pettycash record</a> -->
      <a class="align-left" href="/approve"><i class="fas fa-calendar-check"></i> Approve</a>
      <a class="align-left" href="/approve"><i class="fas fa-id-card"></i> Profile</a>
      <a v-if="permission === 0" class="align-left" href="/signup"><i class="fas fa-sign-in-alt"></i> Sign up</a>
      <a class="align-left" href="#" v-on:click="logOut"><i class="fas fa-sign-out-alt"></i> Log out</a>

    </div>
    <div>
      <br>
      <b-container class="bv-example-row bv-example-row-flex-cols">
        <b-row>
          <b-col align-self="start"></b-col>
          <b-col align-self="center"></b-col>
          <b-col class="align-right" align-self="end"><span style="font-size:30px;cursor:pointer" v-on:click="openNav ()"><div id="xx"></div></span></b-col>
        </b-row>
      </b-container>
      <!-- <b-container>
        <b-row>
          <b-col>
            aaa
          </b-col>
          <b-col>
            aaa
          </b-col>
          <b-col>
            aaa
          </b-col>
        </b-row>
      </b-container> -->
    </div>
  </div>
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data () {
    return {
      isTrue: true,
      symbols: '&#9776;',
      permission: 0
    }
  },
  metaInfo () {
    return {
      title: 'Dashboard',
      titleTemplate: '%s - LPTT'
    }
  },
  methods: {
    openNav () {
      var el = document.getElementById('mySidenav')
      if (el.style.width === '250px') {
        el.style.width = '0px'
        // this.symbols = '&#9776;'
        document.getElementById('xx').innerHTML = '<i class="fas fa-align-justify"></i>'
      } else {
        el.style.width = '250px'
        document.getElementById('xx').innerHTML = '<i class="fas fa-align-right"></i>'
      }
    },

    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
    },
    logOut () {
      console.log('logout')
      localStorage.removeItem('iat')
      localStorage.removeItem('username')
      localStorage.removeItem('jwt')
      localStorage.removeItem('role')
      location.replace('/')
    }
  },
  mounted () {
    document.getElementById('xx').innerHTML = '<i class="fas fa-align-justify"></i>'
    // console.log(VueJwtDecode.decode(JSON.parse(localStorage.getItem('jwt'))))
    var localjwt = localStorage.getItem('jwt')
    if (localjwt !== null) {
      console.log('3')
      const jwt = VueJwtDecode.decode(JSON.parse(localStorage.getItem('jwt')))
      this.permission = JSON.parse(jwt.role)
      console.log(this.permission)
      // this.permission = VueJwtDecode.decode(JSON.parse(localStorage.getItem('role')))
    }
    // const jwt = VueJwtDecode.decode(JSON.parse(localStorage.getItem('jwt')))
    // this.permission = JSON.parse(jwt.role)
    // console.log(this.permission)
    // this.permission = VueJwtDecode.decode(JSON.parse(localStorage.getItem('role')))
  }
}
</script>
<style scoped src="@/assets/css/dashboard.css">
</style>
