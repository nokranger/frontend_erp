<template>
  <div>
    ยืนยันใบลา
      <div>
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
                <!-- {{events.status}} -->
                <p v-if="events.approve == '0'">
                  ยังไม่ยืนยัน
                </p>
                <p v-if="events.approve == '1'">
                  ยืนยันแล้ว
                </p>
              </li>
            </ul>
          </b-col>
        </b-row>
      </div>
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
<style lang="">
</style>
