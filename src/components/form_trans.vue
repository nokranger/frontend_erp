<template>
  <div>
      <b-container>
        <br>
        <b-row>
          <b-col>
            <div>
              <div class="align-left">
                TransID
              </div>
              <b-form-input type="text" v-model="transportation.trans_id"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">
                EmpID
              </div>
              <b-form-input type="text" v-model="transportation.employee_id"></b-form-input>
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
                วันที่
              </div>
              <b-form-input type="date" v-model="transportation.trans_date"></b-form-input>
            </div>
          </b-col>
          <b-col></b-col>
          <!-- <b-col></b-col> -->
        </b-row>
      </b-container>

        <b-container>
          <br>
          <div class="align-center">
            Round trip
          </div>
          <br>
          <b-row>
            <b-col>
              <div>
                <div class="align-left">
                  เริ่ม
                </div>
                <b-form-input type="text" v-model="transportation.trans_from"></b-form-input>
              </div>
            </b-col>
            <b-col>
              <div>
                <div class="align-left">
                  ถึง
                </div>
                <b-form-input type="text" v-model="transportation.trans_to"></b-form-input>
              </div>
            </b-col>
            <b-col>
              <div>
                <div class="align-left">
                  โดยสาร
                </div>
                <div>
                  <b-form-select v-model="transportation.trans_vehicle" :options="options"></b-form-select>
                  <!-- <b-form-select v-model="selected" :options="options"></b-form-select> -->
                  <div class="align-left">
                    ค่าใช้จ่าย
                  </div>
                  <b-form-input type="text" v-model="transportation.trans_values"></b-form-input>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <br>
              <div>
                <b-button style="width:20%" variant="outline-primary" v-on:click="send ()"><i class="fas fa-upload"></i></b-button>
              </div>
            </b-col>
          </b-row>
        </b-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      transportation: {
        trans_id: '',
        employee_id: '',
        trans_date: '',
        trans_from: '',
        trans_to: '',
        trans_vehicle: '',
        approve_id: '',
        trans_values: ''
      },
      options: [
        // {
        //   value: null, text: 'Please Select'
        // },
        {
          value: 1, text: 'BTS'
        },
        {
          value: 2, text: 'MRT'
        },
        {
          value: 3, text: 'Taxi'
        },
        {
          value: 4, text: 'Motorcycle'
        }
      ]
      // detail_transportation: {
      //   trans_id: '',
      //   trans_date: '',
      //   trans_form: '',
      //   trans_to: '',
      //   trans_vehicle: '',
      //   trans_values: ''
      // }
    }
  },
  methods: {
    send () {
      console.log('test')
      console.log(this.transportation)
      axios.post('http://127.0.0.1:4000/trans/post-trans', this.transportation).then(response => {
        console.log(response)
      }).catch(e => {
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
.align-center {
  text-align: center;
}
div {
  font-family: 'Kanit', sans-serif;
}
</style>
