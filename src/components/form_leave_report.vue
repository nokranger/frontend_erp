<template>
  <div>
      <b-container>
        <br>
        <b-row>
          <b-col>
          </b-col>
          <b-col>
            <div class="align-left">
              <label style="color:red;font-size:25px;">*</label>  ลาป่วย
            </div>
            <div><b-input type="text" v-model="sick_leave" readonly></b-input></div>
          </b-col>
          <b-col>
            <div class="align-left">
              <label style="color:red;font-size:25px;">*</label>  ลากิจ
            </div>
            <div><b-input type="text" v-model="leaveCount" readonly></b-input></div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div>
              <div class="align-left">
               <label style="color:red;font-size:25px;">*</label> Start
              </div>
              <b-form-input id="start" type="datetime-local" v-model="leaveActivityReport.start_time"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">
              <label style="color:red;font-size:25px;">*</label>  End
              </div>
              <b-form-input  id="end" type="datetime-local" v-model="leaveActivityReport.end_time" v-on:change="check_amount_leave()"></b-form-input>
            </div>
          </b-col>
          <b-col>
          <div>
            <div class="align-left">
              <label style="color:red;font-size:25px;">*</label>  Amount
            </div>
              <b-form-input id="amount" type="text" v-model="leaveActivityReport.amount" disabled></b-form-input>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-container>
        <br>
        <b-row>
          <b-col>
            <div>
              <div class="align-left">
              <label style="color:red;font-size:25px;">*</label>  Leave type
              </div>
              <b-form-select id="type" ref="leave_report" v-model="selected" :options="options"></b-form-select>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">
              <label style="color:red;font-size:25px;">*</label>  Reason
              </div>
              <b-form-input  id="reason" type="text" v-model="leaveActivityReport.reason_for_leave"></b-form-input>
            </div>
          </b-col>
        </b-row>
        <b-container style="width:70%">
          <br>
          <b-row>
            <b-col>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <br>
              <div>
                <b-button id="send" style="width:30%" variant="primary" v-on:click="send ()"><i class="fas fa-upload"></i></b-button>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import apiURL from '../assets/js/connectionAPI'
export default {
  data () {
    return {
      apiURL: apiURL,
      file: null,
      leaveActivityReport: {
        employee_id: '',
        leave_activity_report_id: '',
        start_time: '',
        end_time: '',
        amount: '',
        reason_for_leave: '',
        leave_category: '',
        approve_id: '',
        approve_date: '',
        status: 0
      },
      leaveCount: '',
      sick_leave: '',
      selected: null,
      options: [
        {
          value: null, text: 'Please Select', disabled: true
        },
        {
          value: 1, text: 'ลากิจ'
        },
        {
          value: 2, text: 'ลาป่วย'
        }
      ]
    }
  },
  created () {
  },
  mounted () {
    this.leaveActivityReport.employee_id = JSON.parse(localStorage.getItem('username'))
    this.check_leave()
  },
  methods: {
    send () {
      // this.check_amount_leave()
      this.leaveActivityReport.leave_category = this.$refs.leave_report.localValue
      axios.post(this.apiURL + '/leavear/post-la_report', this.leaveActivityReport).then(response => {
        // console.log(response)
        // console.log('1')
        this.leaveActivityReport = {
          employee_id: JSON.parse(localStorage.getItem('username')),
          leave_activity_report_id: '',
          start_time: '',
          end_time: '',
          amount: '',
          reason_for_leave: '',
          leave_category: '',
          approve_id: '',
          approve_date: '',
          status: 0
        }
        this.selected = null
      })
        .catch(e => {
          this.error.push(e)
        })
      // console.log('2')
    },
    check_amount_leave () {
      var minutes = 1000 * 60
      var hours = minutes * 60
      var days = hours * 24
      // var years = days * 365
      var st = new Date(this.leaveActivityReport.start_time).getTime()
      var et = new Date(this.leaveActivityReport.end_time).getTime()
      var diff = Math.abs(et - st)
      var timesubtract = parseInt(diff, 10)
      this.leaveActivityReport.amount = Math.floor(timesubtract / days)
    },
    dis_form () {
      document.getElementById('send').disabled = true
      document.getElementById('start').readOnly = true
      document.getElementById('end').readOnly = true
      document.getElementById('amount').readOnly = true
      document.getElementById('type').disabled = true
      document.getElementById('reason').readOnly = true
    },
    en_form () {
      document.getElementById('send').disabled = false
      document.getElementById('start').readOnly = false
      document.getElementById('end').readOnly = false
      document.getElementById('amount').readOnly = false
      document.getElementById('type').disabled = false
      document.getElementById('reason').readOnly = false
    },
    check_leave () {
      // console.log('checkleave')
      const emp = {
        id: JSON.parse(localStorage.getItem('username'))
      }
      axios.post(this.apiURL + '/leavear/checkleave', emp).then(response => {
        this.leaveCount = response.data.result[0].leave_activity
        this.sick_leave = response.data.result[0].leave_sick
        // console.log('res', this.leaveCount)
        if ((this.leaveCount <= 0 && this.sick_leave <= 0) || this.leaveCount === '') {
          this.dis_form()
        } else if ((this.leaveCount > 0 && this.sick_leave >= 0) || this.leaveCount !== '') {
          this.en_form()
        }
      })
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
.align-left {
  text-align:left
}
div {
  font-family: 'Kanit', sans-serif;
}
</style>
