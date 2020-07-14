<template>
  <div>
    <div style="font-size:30px;">
      Pretty cash
      <b-container>
        <b-row>
          <b-col>
            <div>
              <div class="align-left">
                From
              </div>
              <b-form-input type="date" v-model="prettycash_month.from"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">
                To
              </div>
              <b-form-input type="date" v-model="prettycash_month.to"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div  style="margin-top:-6px;">
                <br>
              </div>
              <b-button v-on:click="selectMonth ()">click</b-button>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <!-- <b-form-input type="date" v-model="prettycash_month.from"></b-form-input>
      <b-form-input type="date" v-model="prettycash_month.to"></b-form-input> -->
      <!-- <b-button v-on:click="selectMonth ()">click</b-button> -->
      <br>
      <br>
    </div>
    <div>
      <b-container>
        <table class="table">
          <thead>
            <tr class="table-active">
              <th scope="col">#</th>
              <th scope="col">Employee</th>
              <th scope="col">Date</th>
              <th scope="col">Detail</th>
              <th scope="col">Amount</th>
              <th scope="col">Service charge</th>
              <th v-if="localjwt === '0'" scope="col">Approve</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(events, index) in event" :key="index" :class="index % 2 === 0 ? 'table-primary' : 'table-active'">
              <th>{{index}}</th>
              <th>{{events.id}}</th>
              <th>{{events.actId}}</th>
              <th>{{events.reason}}</th>
              <th>aa</th>
              <th>aa</th>
              <th v-if="localjwt === '0'">
                <tr v-if="events.approve == '0'">Not approved</tr>
                <tr v-else-if="events.approve == '1'">Approved</tr>
                <tr v-else>-</tr>
              </th>
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
      approve: [],
      localjwt: '',
      prettycash_month: {
        from: '',
        to: ''
      }
    }
  },
  beforeCreate () {

  },
  created () {
    this.localjwt = JSON.parse(localStorage.getItem('role'))
    console.log(this.localjwt)
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
    selectMonth () {
      console.log(this.prettycash_month)
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
