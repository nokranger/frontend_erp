<template>
  <div>
    <div style="font-size:30px;">
      Leave
    </div>
    <div>
      <b-container>
        <b-row>
          <b-col class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
        <b-col class="my-1">
        </b-col>
        <b-col class="my-1">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            size="sm"
            placeholder="Type to Search"
          ></b-form-input>
        </b-col>
        </b-row>
        <b-table :items="event" :fields="fields" :filter="filter" :current-page="currentPage"
      :per-page="perPage" class="mt-3" responsive="sm" head-variant="dark" table-variant="primary" striped bordered hover fixed outlined>
          <template v-slot:cell(approve)="data" v-if="localjwt ==='1'">
            <div v-if="data.item.approve === 0">Pending</div>
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
import apiURL from '../views/connectionAPI'
import moment from 'moment'
// import aa from '../../../../../VueJS/LPTT/frontend_erp/src/img/upload'
export default {
  data () {
    return {
      apiURL: apiURL,
      employee_id: [],
      event: [],
      approve: [],
      reject: [],
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
      console.log('localuser', (this.localjwt))
    }
  },
  beforeUpdate () {

  },
  updated () {

  },
  mounted () {
    this.approve = {
      id: JSON.parse(localStorage.getItem('username'))
    }
    axios.post(this.apiURL + '/leavear/get-all-la_report-user', this.approve).then(response => {
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
      this.totalRows = this.event.length
      this.$refs.table.refresh()
    }).catch(e => {
    })
  },
  methods: {
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
