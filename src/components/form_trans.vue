<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <div>
            Date
            <input type="date" />
          </div>
        </b-col>
        <b-col>
          <div>
            round trip
            <br />from :
            <input type="text" />
            <br />to :
            <input type="text" />
          </div>
        </b-col>
        <b-col>
          <div>
            by & expense
            <div>
              <select name id>
                <option value="0">select</option>
                <option value="1">BTS</option>
                <option value="2">MRT</option>
                <option value="3">Taxi</option>
                <option value="4">Motorcycle</option>
              </select>
              expense
              <input type="text" />
            </div>
          </div>
          <br>
          <button>Submit</button>
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
      axios.post('http://127.0.0.1:4000/emp/post-emp', this.transportation).then(response => {
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
