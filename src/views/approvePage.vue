<template>
  <div>
    <!-- <div style="font-size:30px;">
      Approve
      <br>
      <br>
    </div> -->
    <div>
      <b-container>
        <b-tabs content-class="mt-3" fill>
          <b-tab title="Approve leave" active>
            <app-approveleave></app-approveleave>
          </b-tab>
          <b-tab title="Approve Transportation">
            <app-approvetransport></app-approvetransport>
          </b-tab>
          <b-tab title="Approve prettycash">
            <app-approvecash></app-approvecash>
          </b-tab>
        </b-tabs>
      </b-container>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
// import moment from 'moment'
import approveleave from '../views/approve_leave'
import approveprettycash from '../views/approve_prettycash'
import approvetransport from '../views/approve_transportation'
export default {
  components: {
    'app-approveleave': approveleave,
    'app-approvecash': approveprettycash,
    'app-approvetransport': approvetransport
  },
  data () {
    return {
      employee_id: [],
      event: [],
      approve: [],
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      isBusy: false,
      fields: [],
      localjwt: ''
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
    if (this.localjwt === '0') {
      console.log('local', (this.localjwt))
    }
  },
  beforeUpdate () {

  },
  updated () {

  },
  mounted () {
  },
  methods: {
  },
  metaInfo () {
    return {
      title: 'Approve',
      titleTemplate: '%s - LPTT'
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
