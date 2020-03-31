<template>
  <div>
<b-container>
          <!-- <div>
            Name - lastname :
            <input type="text" v-model="leaveActivityReport.employee_id"/>
          </div> -->
          <!-- <div>
            <input type="radio" />
            Full day
          </div> -->
          <!-- <b-container>
            <b-row>
              <b-col>
                <div>
                  Start
                  <input type="date" />
                </div>
              </b-col>
              <b-col>
                <div>
                  End
                  <input type="date" />
                </div>
              </b-col>
              <b-col>
                <div>
                  จำนวนวันลา
                  <input type="text" />
                </div>
              </b-col>
              <b-col>
                <div>จำนวนวันลาจริง <input type="text"></div>
              </b-col>
            </b-row>
          </b-container> -->
          <div>
            <!-- <input type="radio" />  -->
            <!-- Half day -->
          </div>
          <b-container>
            <b-row>
              <b-col>
                <div>
                  <!-- Day <input type="datetime-local"> -->
                </div>
              </b-col>
              <b-col>
                <div>from <input type="datetime-local" v-model="leaveActivityReport.start_time"></div>
              </b-col>
              <b-col>
                <div>to <input type="datetime-local" v-model="leaveActivityReport.end_time"></div>
              </b-col>
              <b-col>
                <!-- <div>break <input type="text"></div> -->
              </b-col>
              <!-- <b-col>
                <div>
                  value time
                  <input type="text"><input type="text">
                </div>
              </b-col> -->
            </b-row>
          </b-container>
          <b-container>
            <b-row>
              <b-col>
                <div>
                  type <input type="text" v-model="leaveActivityReport.leave_category">
                </div>
              </b-col>
              <b-col>
                <div>
                  reason <input type="text" v-model="leaveActivityReport.reason_for_leave">
                </div>
              </b-col>
              <!-- <b-col>
                <div>
                  <input type="checkbox">หักเงิน <input type="checkbox">หักเปอร์ดซ็น / วัน
                </div>
              </b-col> -->
            </b-row>
            <b-row>
              <!-- <b-col>
                <div>
                  บันทึก <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
              </b-col> -->
              <b-col>
                <div>
                  <input type="file">
                </div>
              </b-col>
              <b-col>
                <div>
                  <button v-on:click="send ()">Upload</button>
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
      leaveActivityReport: {
        employee_id: '',
        leave_activity_report_id: '',
        start_time: '',
        end_time: '',
        reason_for_leave: '',
        leave_category: '',
        approve_id: '',
        approve_date: '',
        status: '',
        file: ''
      }
    }
  },
  methods: {
    send () {
      console.log('test')
      console.log(this.leaveActivityReport)
      axios.post('http://127.0.0.1:4000/leavear/post-la_report', this.leaveActivityReport).then(response => {
        console.log(response)
      }).catch(e => {
        this.error.push(e)
      })
    }
  }
}
</script>
<style>
</style>
