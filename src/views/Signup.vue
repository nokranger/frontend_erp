<template>
  <div class="bg">
    <br>
    <b-container>
      <!-- <b-container>
        <b-row>
          <b-col>
            <div>
              <img src="https://i.imgur.com/0cQYdwv.png" alt="">
            </div>
            <div>
              <input type="file"><br>
              Picture
            </div>
          </b-col>
        </b-row>
      </b-container> -->
      <b-container>
        <b-row>
          <b-col>
            <div class="align-left" id="idcustomer">
              <div>Customer ID </div>
              <input type="text" v-model="empCategory.employee_id">
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">Name</div>
              <input type="text" v-model="empCategory.employee_name">
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">Lastname</div>
              <input type="text" v-model="empCategory.employee_lastname">
            </div>
          </b-col>
        </b-row>

      </b-container>
    <b-container>
      <b-row>
        <b-col>
          <div>
            <div class="align-left">Job Position</div>
            <!-- <input type="text"> -->
            <select name="" id="" v-model="empCategory.job_position_id">
              <option value="0">ผู้จัดการ</option>
            </select>
          </div>
        </b-col>
        <b-col>
          <div>
            <div class="align-left">Email</div>
            <input type="text" v-model="empCategory.employee_email">
          </div>
        </b-col>
        <b-col>
          <div>
            <div class="align-left">Tel.</div>
            <input type="text" v-model="empCategory.employee_tel">
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <b-col>
          <div>
            <div class="align-left">Password</div>
            <input type="password" v-model="empCategory.password">
          </div>
        </b-col>
        <b-col>
          <div>
            <div class="align-left">Work Start Date</div>
            <input type="date" v-model="empCategory.start_date">
          </div>
        </b-col>
        <b-col>
        </b-col>
      </b-row>
    </b-container>
    <br>
    <button v-on:click="send ()">send</button>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      cc: '#2c3e50',
      empCategory: {
        employee_pic: '/img/nok.jpg',
        employee_id: '',
        employee_name: '',
        employee_lastname: '',
        job_position_id: '',
        employee_email: '',
        employee_tel: '',
        password: '',
        start_date: '',
        leave_sick: '30',
        leave_activity: '7',
        leave_vacation: '14'
      }
    }
  },
  metaInfo () {
    return {
      title: 'Signup',
      titleTemplate: '%s - LPTT'
    }
  },
  methods: {
    send () {
      console.log('test')
      axios.post('http://127.0.0.1:4000/emp/post-emp', this.empCategory).then(response => {
        console.log(response)
      }).catch(e => {
        this.error.push(e)
      })
    }
  }
}
</script>
<style scoped>
template {
  height: auto
}

.bg {
  /* The image used */
  /* background-image: url("https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).jpg"); */
  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.align-left {
  text-align: left;
}
.align-center {
  text-align: center;
}
.align-right {
  text-align: right;
}
input {
  width: 100%;
}
select {
  width: 100%;
}
</style>
