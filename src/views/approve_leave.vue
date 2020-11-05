<template>
<div v-if="localjwt == 1">
  <app-leaveuser></app-leaveuser>
</div>
<div v-else-if="localjwt == 0">
  <div>
    <div style="font-size:30px;">
      Leave
    </div>
    <div>
      <b-container>
        <b-row>
          <b-col class="my-1">
          <!-- <div style="margin-top:-9.5px;">
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </div> -->
          <!-- <b-input></b-input> -->
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
          <!-- <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination> -->
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
          <template v-slot:cell(approve)="data" v-if="localjwt === '0'">
            <div>
              <b-button style="margin:1px" v-if="data.item.approve === 0 && data.item.approve !== 1 && data.item !== 2" size="sm" class="mr-2" variant="danger" v-on:click="Rejected (data.item.actId)">Reject</b-button>
              <b-button style="margin:1px" v-else-if="data.item.approve === 1 || data.item.approve === 2" size="sm" class="mr-2" variant="danger" disabled>Reject</b-button>
            </div>
            <div>
              <b-button style="margin:1px" v-if="data.item.approve === 0 && data.item.approve !== 1 && data.item.approve !== 2" size="sm" class="mr-2" variant="success" v-on:click="Papprove (data.item.actId, data.item.id, data.item.amount, data.item.category )">
                Not Approve
              </b-button>
              <b-button style="margin:1px" v-else-if="data.item.approve === 1 || data.item.approve !== 2 && data.item.approve !== 0" size="sm"  class="mr-2" variant="primary" disabled>
                Approved
              </b-button>
            </div>
          </template>
          <template v-slot:cell(approve)="data" v-else-if="localjwt ==='1'">
            <div v-if="data.item.approve === 0">Pending</div>
            <div v-else-if="data.item.approve === 1">Approved</div>
            <div v-else-if="data.item.approve === 2">Rejected</div>
          </template>
        </b-table>
      </b-container>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import leaveuser from '../components/approve_leave_user'
// import aa from '../../../../../VueJS/LPTT/frontend_erp/src/img/upload'
export default {
  components: {
    'app-leaveuser': leaveuser
  },
  data () {
    return {
      employee_id: [],
      event: [],
      approve: [],
      reject: [],
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      isBusy: false,
      fields: ['id', 'actId', 'type', 'leaveStartDate', 'leaveEndDate', 'reason', 'approve'],
      localjwt: ''
    }
  },
  metaInfo () {
    return {
      title: 'Approve Leave',
      titleTemplate: '%s - LPTT'
    }
  },
  beforeCreate () {

  },
  created () {
    this.localjwt = JSON.parse(localStorage.getItem('role'))
    // console.log('local', (this.localjwt))
    if (this.localjwt === '0') {
      console.log('localadmin', (this.localjwt))
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
          type: data.leave_name,
          leaveStartDate: moment(data.start_time).format('MMM Do YY'),
          leaveEndDate: moment(data.end_time).format('MMM Do YY'),
          amount: data.amount,
          reason: data.reason_for_leave,
          approve: data.status,
          category: data.leave_category
        }
      })
      this.totalRows = this.event.length
      this.$refs.table.refresh()
    })).catch(e => {
    })
    setInterval(this.checkExpire, 150000)
  },
  methods: {
    Papprove (index, empid, amount, category) {
      // console.log(JSON.parse(localStorage.getItem('username')))
      // console.log(amount)
      this.approve = {
        id: index,
        emp_id: empid,
        status: 1,
        approve_id: JSON.parse(localStorage.getItem('username')),
        amount: amount,
        category: category,
        approve_date: Date.now()
      }
      console.log(this.approve)
      axios.patch('http://127.0.0.1:4000/leavear/approve-leave-report', this.approve).then(response => {
        this.event = response.data.result.map((data, i) => {
          return {
            id: data.employee_id,
            actId: data.leave_activity_report_id,
            type: data.leave_name,
            leaveStartDate: moment(data.start_time).format('MMM Do YY'),
            leaveEndDate: moment(data.end_time).format('MMM Do YY'),
            amount: data.amount,
            reason: data.reason_for_leave,
            approve: data.status,
            category: data.leave_category
          }
        })
        this.totalRows = this.event.length
        // this.$refs.table.refresh()
      })
    },
    Rejected (index) {
      this.reject = {
        id: index,
        status: 2,
        approve_id: JSON.parse(localStorage.getItem('username')),
        approve_date: Date.now()
      }
      axios.patch('http://127.0.0.1:4000/leavear/reject-leave-report', this.reject).then(response => {
        this.event = response.data.result.map((data, i) => {
          return {
            id: data.employee_id,
            actId: data.leave_activity_report_id,
            type: data.leave_name,
            leaveStartDate: moment(data.start_time).format('MMM Do YY'),
            leaveEndDate: moment(data.end_time).format('MMM Do YY'),
            amount: data.amount,
            reason: data.reason_for_leave,
            approve: data.status,
            category: data.leave_category
          }
        })
        this.totalRows = this.event.length
        this.$refs.table.refresh()
      })
    },
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
