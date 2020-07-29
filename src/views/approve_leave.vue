<template>
  <div>
    <div style="font-size:30px;">
      Leave
    </div>
    <div>
      <b-container>
        <b-table :items="event" :fields="fields" :filter="filter" :current-page="currentPage"
      :per-page="perPage" class="mt-3" responsive="sm" head-variant="dark" table-variant="primary" striped bordered hover fixed outlined>
          <template v-slot:cell(approve)="data" v-if="localjwt === '0'">
            <b-button style="margin:2px" size="sm" class="mr-2" variant="danger">Reject</b-button>
            <b-button v-if="data.item.approve === 0" size="sm" v-on:click="Papprove (data.item.approve)" class="mr-2" variant="success">
              Not Approve
            </b-button>
            <b-button v-else-if="data.item.approve === 1" size="sm" v-on:click="Papprove (data.item.approve)" class="mr-2" variant="primary" disabled>
              Approved
            </b-button>
          </template>
          <template v-slot:cell(approve)="data" v-else-if="localjwt ==='1'">
            <div v-if="data.item.approve === 0">Not Approve</div>
            <div v-else-if="data.item.approve === 1">Approved</div>
            <div v-else-if="data.item.approve === 2">Rejected</div>
          </template>
        </b-table>
      </b-container>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
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

  },
  created () {
    this.localjwt = JSON.parse(localStorage.getItem('role'))
    // console.log('local', (this.localjwt))
    if (this.localjwt === '0') {
      console.log('local', (this.localjwt))
    }
  },
  beforeUpdate () {

  },
  updated () {

  },
  mounted () {
    axios.all([axios.get('http://127.0.0.1:4000/leavear/get-all-la_report')]).then(axios.spread((reslar) => {
      this.event = reslar.data.result.map((data, i) => {
        return {
          id: data.employee_id,
          actId: data.leave_activity_report_id,
          leaveStartDate: moment(data.start_time).format('MMM Do YY'),
          leaveEndDate: moment(data.end_time).format('MMM Do YY'),
          reason: data.reason_for_leave,
          approve: data.status
        }
      })
    })).catch(e => {
      this.error.push(e)
    })
  },
  methods: {
    Papprove (index) {
      this.approve = {
        id: index,
        status: 1,
        approve_id: JSON.parse(localStorage.getItem('username')),
        approve_date: Date.now()
      }
      axios.patch('http://127.0.0.1:4000/leavear/approve-leave-report', this.approve).then(response => {
        this.event = response.data.result.map((data, i) => {
          return {
            id: data.employee_id,
            actId: data.leave_activity_report_id,
            leaveStartDate: moment(data.start_time).format('MMM Do YY'),
            leaveEndDate: moment(data.end_time).format('MMM Do YY'),
            reason: data.reason_for_leave,
            approve: data.status
          }
        })
        this.$refs.table.refresh()
      })
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
