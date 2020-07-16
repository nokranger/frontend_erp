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
              <b-button v-on:click="selectMonth ()">Query</b-button>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <br>
      <br>
    </div>
    <div>
      <b-container>
        <b-table :items="event" :fields="fields" class="mt-3" :busy="isBusy" hover responsive="sm">
              <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
            <template v-slot:cell(Approve)="data" v-if="localjwt === '0'">
                <b-button v-if="event[data.index].Approve === 0" size="sm" v-on:click="Papprove (data.index)" class="mr-2" type="submit">
                  Not Approve
                </b-button>
                <b-button v-if="event[data.index].Approve === 1" size="sm" v-on:click="Papprove (data.index)" class="mr-2" disabled="">
                  Approved
                </b-button>
            </template>
        </b-table>
      </b-container>
      <b-button v-on:click="printPDF ()">Print report</b-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
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
      fields: ['Id', 'Date', 'Request', 'Details', 'Amount', 'Remaining', 'Approve'],
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
      // console.log(this.prettycash_month)
      this.isBusy = !this.isBusy
      axios.post('http://127.0.0.1:4000/cash/get-month-prettycash', this.prettycash_month)
        .then(response => {
          // console.log(response.data.result)
          this.event = response.data.result.map((data, i) => {
            this.remaining = this.remaining - data.amount
            return {
              Id: data.id,
              Date: moment(data.date).format('MMM Do YY'),
              Request: data.employee_id,
              Details: data.detail,
              Amount: data.amount,
              Remaining: this.remaining,
              Approve: data.status
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
    Papprove (index) {
      console.log('test')
      this.approve = {
        id: this.event[index].Id,
        status: 1
      }
      console.log(this.approve)
      axios.patch('http://127.0.0.1:4000/cash/approve-prettycash', this.approve)
    },
    printPDF () {
      location.replace('/print/' + this.prettycash_month.from + this.prettycash_month.to)
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
