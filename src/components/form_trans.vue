<template>
  <div>
      <b-container>
        <br>
        <b-row>
          <!-- <b-col>
            <div>
              <div class="align-left">
                Trans ID
              </div>
              <b-form-input type="text" v-model="transportation.trans_id" readonly=""></b-form-input>
            </div>
          </b-col> -->
          <b-col>
            <div>
              <div class="align-left">
              <label style="color:red;font-size:25px;">*</label>  Request By
              </div>
              <b-form-input type="text" v-model="transportation.employee_id" readonly=""></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">
              <label style="color:red;font-size:25px;">*</label>  Date
              </div>
              <b-form-input type="date" v-model="transportation.trans_date"></b-form-input>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-container>
        <br>
        <b-row>
          <b-col>
            <!-- <div>
              <div class="align-left">
                Date
              </div>
              <b-form-input type="date" v-model="transportation.trans_date"></b-form-input>
            </div> -->
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
                <label style="color:red;font-size:25px;">*</label>  From
                </div>
                <b-form-input type="text" v-model="transportation.trans_from"></b-form-input>
              </div>
            </b-col>
            <b-col>
              <div>
                <div class="align-left">
                <label style="color:red;font-size:25px;">*</label>  To
                </div>
                <b-form-input type="text" v-model="transportation.trans_to"></b-form-input>
              </div>
            </b-col>
            <b-col>
              <div>
                <div class="align-left">
                <label style="color:red;font-size:25px;">*</label>  Vehicle
                </div>
                <div>
                  <b-form-select ref="trans_vehicle" v-model="selected" :options="options"></b-form-select>
                  <!-- <b-form-select v-model="selected" :options="options"></b-form-select> -->
                  <div class="align-left">
                  <label style="color:red;font-size:25px;">*</label>  Amount
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
import apiURL from '../assets/js/connectionAPI'
export default {
  data () {
    return {
      apiURL: apiURL,
      transportation: {
        employee_id: '',
        trans_date: '',
        trans_from: '',
        trans_to: '',
        trans_vehicle: '',
        approve_id: '',
        trans_values: '',
        status: 0
      },
      trans: {},
      selected: null,
      options: [
        {
          value: null, text: 'Please Select'
        },
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
  mounted () {
    this.transportation.employee_id = JSON.parse(localStorage.getItem('username'))
  },
  methods: {
    send () {
      this.selected = null
      console.log('test')
      this.trans = {
        employee_id: JSON.parse(localStorage.getItem('username')),
        trans_date: this.transportation.trans_date,
        trans_from: this.transportation.trans_from,
        trans_to: this.transportation.trans_to,
        trans_vehicle: this.$refs.trans_vehicle.localValue,
        approve_id: '',
        trans_values: this.transportation.trans_values,
        status: 0
      }
      axios.post(this.apiURL + '/trans/post-trans', this.trans).then(response => {
        console.log(response)
        this.transportation = {
          employee_id: JSON.parse(localStorage.getItem('username')),
          trans_date: '',
          trans_from: '',
          trans_to: '',
          trans_vehicle: '',
          approve_id: '',
          trans_values: '',
          status: 0
        }
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
