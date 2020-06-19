<template>
  <div>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S" crossorigin="anonymous">
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" v-on:click="openNav ()">&times;</a>
      <a class="align-left" href="/"><i class="fas fa-home"></i> Home</a>
      <a class="align-left" href="/leavereport"><i class="fas fa-file-alt"></i> Leave Report</a>
      <a class="align-left" href="/transreport"><i class="fas fa-file-alt"></i> Transportation Report</a>
      <a class="align-left" href="/pettycash"><i class="fas fa-file-alt"></i> Petty Cash Record</a>
      <a class="align-left" href="/approveleave"><i class="fas fa-calendar-check"></i> Approve leave</a>
      <a class="align-left" href="/approvetrans"><i class="fas fa-calendar-check"></i> Approve Transportation</a>
      <a class="align-left" href="/signup"><i class="fas fa-sign-in-alt"></i> Sign up</a>
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
export default {
  data () {
    return {
      isTrue: true,
      symbols: '&#9776;'
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
    }
  },
  mounted () {
    document.getElementById('xx').innerHTML = '<i class="fas fa-align-justify"></i>'
  }
}
</script>
<style scoped src="@/assets/css/dashboard.css">
</style>
