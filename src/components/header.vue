<template>
  <div>
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" v-on:click="openNav ()">&times;</a>
      <a href="/">Home</a>
      <a href="/leavereport">Leave Report</a>
      <a href="/transreport">Transportation Report</a>
      <a href="/approveleave">Approve leave</a>
      <a href="/approvetrans">Approve Transportation</a>
      <a href="/signup">Sign up</a>
    </div>
    <div>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col></b-col>
          <b-col><span style="font-size:30px;cursor:pointer" v-on:click="openNav ()">{{symbols}}</span></b-col>
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
        this.symbols = '&#9776;'
      } else {
        el.style.width = '250px'
        this.symbols = '&times;'
      }
    },

    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
    }
  }
}
</script>
<style scoped src="@/assets/css/dashboard.css">
</style>
