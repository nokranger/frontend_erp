<template>
  <div class="bg">
    <br>
    <b-container>
      <b-container>
        <b-row>
          <b-col>
            <div>Attach Picture</div>
            <div>
              <img style="width:400px;hieght:400px" :src="previewImage" class="uploading-image" />
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div>
              <input ref="file" type="file" name="avatar" id="avatar" class="inputfile" accept="image/jpeg, image/png" @change=uploadImage />
              <label for="avatar"><label style="color:red;font-size:25px;">*</label>Choose a file</label>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-container>
        <b-row>
          <b-col>
            <div class="align-left" id="idcustomer">
              <div><label style="color:red;font-size:25px;">*</label>Employee ID</div>
              <b-form-input type="text" v-model="empCategory.employee_id" required></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left"><label style="color:red;font-size:25px;">*</label>Name</div>
              <b-form-input type="text" v-model="empCategory.employee_name"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left"><label style="color:red;font-size:25px;">*</label>Last name</div>
              <b-form-input type="text" v-model="empCategory.employee_lastname"></b-form-input>
            </div>
          </b-col>
        </b-row>

      </b-container>
    <b-container>
      <b-row>
        <b-col>
          <div>
            <div class="align-left"><label style="color:red;font-size:25px;">*</label>Position</div>
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
            <div class="align-left"><label style="color:red;font-size:25px;">*</label>Email</div>
            <b-form-input type="text" v-model="empCategory.employee_email"></b-form-input>
          </div>
        </b-col>
        <b-col>
          <div>
            <div class="align-left"><label style="color:red;font-size:25px;">*</label>Telephone number</div>
            <b-form-input type="text" v-model="empCategory.employee_tel"></b-form-input>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <b-col>
          <div>
            <div class="align-left"><label style="color:red;font-size:25px;">*</label>password</div>
            <b-form-input type="password" v-model="empCategory.password"></b-form-input>
          </div>
        </b-col>
        <b-col>
          <div>
            <div class="align-left"><label style="color:red;font-size:25px;"><br></label>Start</div>
            <b-form-input type="date" v-model="empCategory.start_date"></b-form-input>
          </div>
        </b-col>
        <b-col>
        </b-col>
      </b-row>
    </b-container>
    <br>
    <div>
    <b-button variant="primary" type="submit" v-on:click="send ()">Signup</b-button>
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
        employee_pic: null,
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
      },
      previewImage: null
    }
  },
  metaInfo () {
    return {
      title: 'Signup',
      titleTemplate: '%s - LPTT'
    }
  },
  methods: {
    uploadImage () {
      this.empCategory.employee_pic = this.$refs.file.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(this.empCategory.employee_pic)
      reader.onload = e => {
        this.previewImage = e.target.result
      }
    },
    send () {
      this.selected = null
      this.empCategory.job_position_id = this.$refs.jobId.localValue
      this.empCategory.employee_id = this.empCategory.employee_id.toUpperCase()
      this.empCategory.password = md5(this.empCategory.password)
      const formData = new FormData()
      formData.set('data', JSON.stringify(this.empCategory))
      formData.append('file', this.empCategory.employee_pic)
      console.log((this.empCategory))
      axios.post('http://127.0.0.1:4000/emp/post-emp', formData).then(response => {
        console.log(response)
        this.empCategory = {
          employee_pic: null,
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
      }).catch(e => {
        this.error.push(e)
      })
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
.inputfile{
width: 0.1px;
height: 0.1px;
opacity: 0;
overflow: hidden;
position: absolute;
z-index: -1;
}
label {
  cursor: pointer;
}
label:hover {
  /* background: black; */
  color: lightgray;
  padding: 20;
}
</style>
