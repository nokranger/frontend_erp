<template>
  <div>
    <div style="font-size:30px;">
      อนุมัติใบลา
      <br>
      <br>
    </div>
    <div>
      <b-container>
        <table class="table">
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
        </table>
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
export default {
  data () {
    return {
      employee_id: [],
      event: [],
      approve: []
    }
  },
  beforeCreate () {

  },
  created () {

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
