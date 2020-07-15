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
        <!-- <table class="table">
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
              <th>{{events.employee_id}}</th>
              <th>{{events.date}}</th>
              <th>{{events.detail}}</th>
              <th>{{events.amount}}</th>
              <th>{{events.service_charge}}</th>
              <th style="text-align:center !important" v-if="localjwt === '0'">
                <tr style="text-align:center" v-if="events.approve == '0'">Not approved</tr>
                <tr style="text-align:center" v-else-if="events.approve == '1'">Approved</tr>
                <tr style="text-align:center" v-else>-</tr>
              </th>
            </tr>
          </tbody>
        </table> -->
        <b-table :items="event" :fields="fields" class="mt-3" :busy="isBusy" hover responsive="sm">
              <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
            <template v-slot:cell(Approve)="data" v-if="localjwt === '0'">
                <b-button v-if="localjwt === '0'" size="sm" v-on:click="test ()" class="mr-2">
                  {{data.index}}
                </b-button>
                <b-button v-if="localjwt === '1'" size="sm" v-on:click="test ()" class="mr-2">
                  aaaaaaabbbb
                </b-button>
            </template>
                        <!-- <template v-slot:cell(Approve)="" v-if="localjwt === '0'">
                <b-button v-if="localjwt === '0'" size="sm" v-on:click="test ()" class="mr-2">
                  aaaaaaabbbb
                </b-button>
            </template> -->
        </b-table>
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
      isBusy: false,
      employee_id: [],
      event: [],
      approve: [],
      localjwt: '',
      prettycash_month: {
        from: '',
        to: ''
      },
      fields: ['Date', 'Request', 'Details', 'Amount', 'Remaining', 'Approve'],
      remaining: 20000
    }
  },
  beforeCreate () {

  },
  created () {
    this.localjwt = JSON.parse(localStorage.getItem('role'))
    console.log(this.localjwt)
    this.isBusy = !this.isBusy
  },
  beforeUpdate () {

  },
  updated () {

  },
  mounted () {
    // axios.all([axios.get('http://127.0.0.1:4000/cash/get-month-prettycash')]).then(axios.spread((response) => {
    //   // const vm = this
    //   // vm.getData(res)
    //   // this.event = reslar.data.result.map((data, i) => {
    //   //   return {
    //   //     id: data.employee_id,
    //   //     actId: data.leave_activity_report_id,
    //   //     reason: data.reason_for_leave,
    //   //     approve: data.status
    //   //   }
    //   // })
    //   console.log(response)
    // })).catch(e => {
    //   this.error.push(e)
    // })
    // console.log(this.info.length)
    // axios.post('http://127.0.0.1:4000/cash/get-month-prettycash', this.prettycash_month)
    //   .then(response => {
    //     console.log(response)
    //   })
  },
  methods: {
    selectMonth () {
      console.log(this.prettycash_month)
      this.isBusy = !this.isBusy
      axios.post('http://127.0.0.1:4000/cash/get-month-prettycash', this.prettycash_month)
        .then(response => {
          console.log(response.data.result)
          this.event = response.data.result.map((data, i) => {
            this.remaining = this.remaining - data.amount
            return {
              Date: data.date,
              Request: data.employee_id,
              Details: data.detail,
              Amount: data.amount,
              Remaining: this.remaining,
              Approve: 'Not approved'
            }
          })
          // this.event = {
          //   Date: this.event.date,
          //   Request: this.event.employee_id,
          //   Details: this.event.detail,
          //   Amount: this.event.amount,
          //   Remaining: 20000 - this.event.amount,
          //   Approve: 'Not approved'
          // }
          console.log(this.event)
        })
    },
    test () {
      console.log('test')
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
.align-right {
  text-align: right;
}
div {
  font-family: 'Kanit', sans-serif;
}
</style>
