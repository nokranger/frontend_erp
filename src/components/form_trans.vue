<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <div>
            TransID <input type="text" v-model="transportation.trans_id">
          </div>
        </b-col>
        <b-col>
          <div>
            EmpID <input type="text" v-model="transportation.employee_id">
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div>
            Date
            <input type="date" v-model="transportation.trans_date"/>
          </div>
        </b-col>
        <b-col>
          <div>
            round trip
            <br />from :
            <input type="text" v-model="transportation.trans_form"/>
            <br />to :
            <input type="text" v-model="transportation.trans_to"/>
          </div>
        </b-col>
        <b-col>
          <div>
            by & expense
            <div>
              <select v-model="transportation.trans_vehicle">
                <option value="1">BTS</option>
                <option value="2">MRT</option>
                <option value="3">Taxi</option>
                <option value="4">Motorcycle</option>
              </select>
              expense
              <input type="text" v-model="transportation.trans_values"/>
            </div>
          </div>
          <br>
          <button v-on:click="send ()">Submit</button>
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
        trans_form: '',
        trans_to: '',
        trans_vehicle: '',
        approve_id: '',
        trans_values: ''
      }
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
<style>
</style>
