<template>
  <div>
      <div>

</div>
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" v-on:click="openNav ()">&times;</a>
      <a href="#">Leave Report</a>
      <a href="#">Transportation Report</a>
      <a href="#">Approve leave</a>
      <a href="#">Approve Transportation </a>
    </div>
    <div>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col></b-col>
          <b-col><span style="font-size:30px;cursor:pointer" v-on:click="openNav ()">{{symbols}}</span></b-col>
        </b-row>
      </b-container>
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
