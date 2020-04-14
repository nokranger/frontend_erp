<template>
  <div v-bind:style="{background: lpttcolor,hieght: '100%', padding: '50px'}">
    dashboard
    <b-container fluid="xl">
      <b-container>
        <b-row>
          <b-col>
            <div>
              Member
              <b-col>
                <!-- {{emp.employee_id[1]}} -->
                <ul style="list-style-type: none;margin:0;padding:0;">
                  <li v-for="(employee_ids, index) in employee_id" :key="index">
                    {{employee_ids.id}}
                  </li>
                </ul>
                <!-- {{employee_id}} -->
              </b-col>
            </div>
          </b-col>
          <b-col>
            <div>
              Activity
              <b-col>
                <ul style="list-style-type: none;margin:0;padding:0;">
                  <li v-for="(events, index) in event" :key="index">
                    {{events.id}}
                  </li>
                </ul>
              </b-col>
            </div>
          </b-col>
          <b-col>
            <div>
              Approves
              <b-col>
                <ul style="list-style-type: none;margin:0;padding:0;">
                  <li v-for="(approves, index) in approve" :key="index">
                    {{approve.id}}
                    <p v-if="approves.id == '0'">
                      ยังไม่ยืนยัน
                    </p>
                    <p v-else-if="approves.id == '1'">
                      ยืนยันแล้ว
                    </p>
                  </li>
                  <!-- {{approve}} -->
                </ul>
              </b-col>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      lpttcolor: 'white',
      isTrue: true,
      symbols: '&#9776;',
      employee_id: [],
      aa: ['a', 'b', 'c', 'd'],
      event: [],
      approve: []
    }
  },
  metaInfo () {
    return {
      title: 'Dashboard',
      titleTemplate: '%s - LPTT'
    }
  },
  created () {
    console.log('test')
  },
  updated () {
  },
  mounted () {
    axios.all([axios.get('http://127.0.0.1:4000/emp/get-last-emp'), axios.get('http://127.0.0.1:4000/leavear/get-all-la_report'), axios.get('http://127.0.0.1:4000/trans/get-last-trans')]).then(axios.spread((resemp, reslar, restrans) => {
      // const vm = this
      this.employee_id = resemp.data.result.map((data, i) => {
        return {
          id: data.employee_id
        }
      })
      // vm.getData(res)
      this.event = reslar.data.result.map((data, i) => {
        return {
          id: data.reason_for_leave
        }
      })
      this.approve = restrans.data.result.map((data, i) => {
        return {
          id: data.approve_id
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
<style scoped src="@/assets/css/dashboard.css">
</style>
