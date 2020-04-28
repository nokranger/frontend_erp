<template>
  <div>
    <div style="font-size:30px;">
      อนุมัติใบเบิกค่าใช้จ่ายสำหรับเดินทาง
      <br>
      <br>
    </div>
    <!-- {{event}} -->
    <div>
      <b-container>
        <table class="table">
          <thead>
            <tr class="table-active">
              <th scope="col">#</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Transportation Report ID</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Expense</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(events, index) in event" :key="index" :class="index % 2 === 0 ? 'table-primary' : 'table-active'">
              <th >{{index}}</th>
              <th>{{events.id}}</th>
              <th>{{events.transId}}</th>
              <th>{{events.from}}</th>
              <th>{{events.to}}</th>
              <th>{{events.prices}}</th>
              <th v-if="events.approve == '0'">Not approved</th>
              <th v-else-if="events.approve == '1'">Approved</th>
              <th v-else>-</th>
            </tr>
          </tbody>
        </table>
      </b-container>
      <!-- <b-container>
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
            รหัสใบเบิก
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.transId}}
              </li>
            </ul>
          </b-col>
          <b-col>
            เริ่ม
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.from}}
              </li>
            </ul>
          </b-col>
          <b-col>
            ถึง
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.to}}
              </li>
            </ul>
          </b-col>
          <b-col>
            ค่าใช้จ่าย
            <ul style="list-style-type: none;margin:0;padding:0;">
              <li v-for="(events, index) in event" :key="index">
                {{events.prices}}
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
      </b-container> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      event: []
    }
  },
  beforeCreate () {},
  created () {},
  updated () {},
  mounted () {
    axios.all([axios.get('http://127.0.0.1:4000/trans/get-all-trans')]).then(axios.spread((restrans) => {
      this.event = restrans.data.result.map((data, i) => {
        return {
          id: data.employee_id,
          transId: data.trans_id,
          from: data.trans_from,
          to: data.trans_to,
          prices: data.trans_values,
          approve: data.status
        }
      })
    })).catch(e => {
      this.error.push(e)
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
