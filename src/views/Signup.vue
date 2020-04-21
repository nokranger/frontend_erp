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
              <div>รหัสพนักงาน</div>
              <b-form-input type="text" v-model="empCategory.employee_id"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">ชื่อ</div>
              <b-form-input type="text" v-model="empCategory.employee_name"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">นามสกุล</div>
              <b-form-input type="text" v-model="empCategory.employee_lastname"></b-form-input>
            </div>
          </b-col>
        </b-row>

      </b-container>
    <b-container>
      <b-row>
        <b-col>
          <div>
            <div class="align-left">ตำแหน่งพนักงาน</div>
            <!-- <b-form-input type="text"> -->
            <b-form-select name="" id="" v-model="empCategory.job_position_id">
              <option value="0">ผู้จัดการ</option>
            </b-form-select>
          </div>
        </b-col>
        <b-col>
          <div>
            <div class="align-left">อีเมลล์</div>
            <b-form-input type="text" v-model="empCategory.employee_email"></b-form-input>
          </div>
        </b-col>
        <b-col>
          <div>
            <div class="align-left">เบอร์โทรศัพท์</div>
            <b-form-input type="text" v-model="empCategory.employee_tel"></b-form-input>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <b-col>
          <div>
            <div class="align-left">รหัสผ่าน</div>
            <b-form-input type="password" v-model="empCategory.password"></b-form-input>
          </div>
        </b-col>
        <b-col>
          <div>
            <div class="align-left">วันเริ่มทำงาน</div>
            <b-form-input type="date" v-model="empCategory.start_date"></b-form-input>
          </div>
        </b-col>
        <b-col>
        </b-col>
      </b-row>
    </b-container>
    <br>
    <b-button variant="outline-primary" v-on:click="send ()">อัพโหลด</b-button>
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
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
div {
  font-family: 'Kanit', sans-serif;
}
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
