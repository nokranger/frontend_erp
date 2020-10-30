<template>
  <div>
      <b-container>
        <br>
        <b-row>
          <b-col>
            <div>
              <div class="align-left">
               <label style="color:red;font-size:25px;">*</label> Start
              </div>
              <b-form-input type="datetime-local" v-model="leaveActivityReport.start_time"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">
              <label style="color:red;font-size:25px;">*</label>  End
              </div>
              <b-form-input type="datetime-local" v-model="leaveActivityReport.end_time"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">
              <label style="color:red;font-size:25px;">*</label>  Amount
              </div>
              <b-form-input type="text"></b-form-input>
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
              <b-form-select ref="leave_report" v-model="selected" :options="options"></b-form-select>
              <!-- <b-form-input type="text" v-model="leaveActivityReport.leave_category"></b-form-input> -->
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">
              <label style="color:red;font-size:25px;">*</label>  Reason
              </div>
              <b-form-input type="text" v-model="leaveActivityReport.reason_for_leave"></b-form-input>
            </div>
          </b-col>
          <!-- <b-col>
                <div>
                  <input type="checkbox">หักเงิน <input type="checkbox">หักเปอร์ดซ็น / วัน
                </div>
          </b-col>-->
        </b-row>
        <b-container style="width:70%">
          <br>
          <b-row>
            <!-- <b-col>
                  <div>
                    บันทึก <textarea name="" id="" cols="30" rows="10"></textarea>
                  </div>
            </b-col>-->
            <b-col>
              <!-- <div>
                <b-form-file
                  v-model="file"
                  :state="Boolean(file)"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </div> -->
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <br>
              <div>
                <b-button style="width:30%" variant="outline-primary" v-on:click="send ()"><i class="fas fa-upload"></i></b-button>
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
      file: null,
      leaveActivityReport: {
        employee_id: '',
        leave_activity_report_id: '',
        start_time: '',
        end_time: '',
        reason_for_leave: '',
        leave_category: '',
        approve_id: '',
        approve_date: '',
        status: 0,
        file: '/doc/nok.docs'
      },
      selected: null,
      options: [
        {
          value: null, text: 'Please Select'
        },
        {
          value: 1, text: 'ลากิจ'
        },
        {
          value: 2, text: 'ลาป่วย'
        },
        {
          value: 3, text: 'ลาพักร้อน'
        }
      ]
    }
  },
  metaInfo () {
    return {
      title: 'Leave Report',
      titleTemplate: '%s - LPTT'
    }
  },
  mounted () {
    this.leaveActivityReport.employee_id = JSON.parse(localStorage.getItem('username'))
  },
  methods: {
    send () {
      console.log('test')
      console.log(this.leaveActivityReport)
      this.leaveActivityReport.leave_category = this.$refs.leave_report.localValue
      axios
        .post(
          'http://127.0.0.1:4000/leavear/post-la_report',
          this.leaveActivityReport
        )
        .then(response => {
          console.log(response)
          this.leaveActivityReport = {
            employee_id: JSON.parse(localStorage.getItem('username')),
            leave_activity_report_id: '',
            start_time: '',
            end_time: '',
            reason_for_leave: '',
            leave_category: '',
            approve_id: '',
            approve_date: '',
            status: 0,
            file: '/doc/nok.docs'
          }
          this.selected = null
        })
        .catch(e => {
          this.error.push(e)
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
