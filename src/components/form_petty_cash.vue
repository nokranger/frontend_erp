<template>
  <div>
    <div style="font-size: 30px;">
      Petty Cash
    </div>
    <b-container>
      <br>
      <b-row>
        <b-col>
          <div class="align-left">
            Date
            <b-form-input type="date" v-model="prettycash.date"></b-form-input>
          </div>
        </b-col>
        <b-col>
          <div class="align-left">
            Request by
          </div>
          <b-form-input type="text" v-model="prettycash.employee_id" placeholder="Request (EmpID)" readonly></b-form-input>
        </b-col>
        <b-col>
          <b-row>
          <b-col>
            <div class="align-left">
              Amount
              <b-form-input type="text" v-model="prettycash.amount"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div class="align-left">
              Service charge
              <b-form-input type="text" v-model="prettycash.service_charge"></b-form-input>
            </div>
          </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <br>
          <div class="align-left">
            Detail
            <b-form-textarea
              id="textarea"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
              v-model="prettycash.detail"
            ></b-form-textarea>
           </div>
        </b-col>
      </b-row>
      <b-row>
        <!-- <b-col></b-col>
        <b-col></b-col> -->
        <b-col>
          <br>
          <div>
            <b-button style="width:20%" variant="outline-primary" type="submit" v-on:click="send ()"><i class="fas fa-upload"></i></b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios'
export default {
  data () {
    return {
      prettycash: {
        date: '',
        employee_id: '',
        amount: '',
        service_charge: '',
        detail: '',
        picture: 'img/nok.jpg',
        status: 0
      }
    }
  },
  mounted () {
    const jwt = VueJwtDecode.decode(JSON.parse(localStorage.getItem('jwt')))
    console.log(jwt)
    this.prettycash.employee_id = jwt.sub
  },
  methods: {
    send () {
      console.log('send')
      console.log(this.prettycash)
      axios.post('http://localhost:4000/cash/post-prettycash', this.prettycash).then(respone => {
        console.log(respone)
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
