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
              <b-form-input type="text" v-model="empCategory.employee_id" required></b-form-input>
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
            <b-form-select ref="jobId" name="" id="" v-model="selected" :options="options" value="selected">
              <option value="1">Business Development Coordinator</option>
              <option value="2">Junior IT Engineer</option>
              <option value="3">Senior IT Engineer</option>
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
    <div>
    <b-button variant="outline-primary" type="submit" v-on:click="send ()">Signup</b-button>
    <!-- <b-button class="blue-gradient btn-block" type="submit" v-on:click="test ()">LOGIN</b-button><br> -->
    </div>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import md5 from 'md5'
export default {
  data () {
    return {
      show: true,
      selected: null,
      options: [
        { value: null, text: 'Please select an option' }
      ],
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
        leave_activity: '6',
        leave_vacation: '6'
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
      // console.log('test')
      // console.log(md5(this.empCategory.password))
      this.empCategory.job_position_id = this.$refs.jobId.localValue
      this.empCategory.employee_id = this.empCategory.employee_id.toUpperCase()
      this.empCategory.password = md5(this.empCategory.password)
      // this.empCategory = {
      //   employee_pic: this.empCategory.employee_pic,
      //   employee_id: this.empCategory.employee_id,
      //   employee_name: this.empCategory.employee_name,
      //   employee_lastname: this.empCategory.employee_lastname,
      //   job_position_id: this.empCategory.job_position_id,
      //   employee_email: this.empCategory.employee_email,
      //   employee_tel: this.empCategory.employee_tel,
      //   password: md5(this.empCategory.password),
      //   start_date: this.empCategory.start_date,
      //   leave_sick: this.empCategory.leave_sick,
      //   leave_activity: this.empCategory.leave_activity,
      //   leave_vacation: this.empCategory.leave_vacation
      // }
      // const ss = this.empCategory.password
      console.log((this.empCategory))
      axios.post('http://127.0.0.1:4000/emp/post-emp', this.empCategory).then(response => {
        console.log(response)
      }).catch(e => {
        this.error.push(e)
      })
      // location.reload()
    },
    test () {
      this.empCategory.job_position_id = this.$refs.jobId.localValue
      console.log(this.empCategory.job_position_id)
      console.log('test')
      // location.reload()
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
  /* height: 100%; */

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
