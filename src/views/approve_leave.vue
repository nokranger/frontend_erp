<template>
  <div>
    <div style="font-size:30px;">
      อนุมัติใบลา
      <br>
      <br>
    </div>
    <div>
      <b-container>
        <b-table :items="event" :fields="fields" :filter="filter" :current-page="currentPage"
      :per-page="perPage" class="mt-3" responsive="sm" head-variant="dark" table-variant="primary" striped bordered hover fixed outlined>
          <template v-slot:cell(approve)="data" v-if="localjwt === '0'">
            <b-button v-if="event[data.index].approve === 0" size="sm" v-on:click="Papprove (data.index)" class="mr-2" variant="success" type="submit">
              Not Approve
            </b-button>
            <b-button v-if="event[data.index].approve === 1" size="sm" v-on:click="Papprove (data.index)" class="mr-2" variant="primary" disabled="">
              Approved
            </b-button>
          </template>
        </b-table>
        <!-- <table class="table">
          <thead>
            <tr class="table-active">
              <th scope="col">#</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Leave Report ID</th>
              <th scope="col">Type Leave</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(events, index) in event" :key="index" :class="index % 2 === 0 ? 'table-primary' : 'table-active'">
              <th>{{index}}</th>
              <th>{{events.id}}</th>
              <th>{{events.actId}}</th>
              <th>{{events.reason}}</th>
              <th v-if="events.approve == '0'">Not approved</th>
              <th v-else-if="events.approve == '1'">Approved</th>
              <th v-else>-</th>
            </tr>
          </tbody>
        </table> -->
      </b-container>
    </div>
      <!-- <div>
        <b-row>
          <b-col>
            รหัสพนักงาน
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.id}}
              </li>
            </ul>
          </b-col>
          <b-col>
            รหัสใบลา
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.actId}}
              </li>
            </ul>
          </b-col>
          <b-col>
            ประเภทวันลา
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.reason}}
              </li>
            </ul>
          </b-col>
          <b-col>
            สถานะ
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                <p v-if="events.approve == '0'">
                  ยังไม่อนุมัติ
                </p>
                <p v-if="events.approve == '1'">
                  อนุมัติแล้ว
                </p>
              </li>
            </ul>
          </b-col>
        </b-row>
      </div> -->
  </div>
</template>
<script>
import axios from 'axios'
// import moment from 'moment'
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
      // const vm = this
      // vm.getData(res)
      this.event = reslar.data.result.map((data, i) => {
        return {
          id: data.employee_id,
          actId: data.leave_activity_report_id,
          reason: data.reason_for_leave,
          approve: data.status
        }
      })
    })).catch(e => {
      this.error.push(e)
    })
    // console.log(this.info.length)
  },
  methods: {
    Papprove (index) {
      // console.log('test')
      this.approve = {
        id: this.event[index].actId,
        status: 1
      }
      // console.log(this.prettycash_month)
      // axios.all([axios.patch('http://127.0.0.1:4000/cash/approve-prettycash', this.approve), axios.post('http://127.0.0.1:4000/cash/get-month-prettycash', this.prettycash_month)]).then(axios.spread((responseApp, response) => {
      //   this.event = response.data.result.map((data, i) => {
      //     // this.remaining = this.remaining - data.amount
      //     return {
      //       Id: data.id,
      //       Date: moment(data.date).format('MMM Do YY'),
      //       Request: data.employee_id,
      //       Details: data.detail,
      //       Amount: data.amount,
      //       Remaining: this.remaining,
      //       Approve: data.status
      //     }
      //   })
      //   this.$refs.table.refresh()
      // }))
      axios.patch('http://127.0.0.1:4000/leavear/approve-leave-report', this.approve).then(response => {
        this.event = response.data.result.map((data, i) => {
          return {
            id: data.employee_id,
            actId: data.leave_activity_report_id,
            reason: data.reason_for_leave,
            approve: data.status
          }
        })
        this.$refs.table.refresh()
      })

      // this.$refs.table.refresh()
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
