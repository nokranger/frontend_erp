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
      <br>
      <b-row>
        <b-col>
          <div>
              <img style="width:400px;hieght:400px" :src="previewImage" class="uploading-image" />
              <!-- <b-button type="button" v-on:click="sendFile ()">upload</b-button> -->
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div>
            <input ref="file" type="file" name="avatar" id="avatar" class="inputfile" accept="image/jpeg, image/png" @change=uploadImage />
            <label for="avatar">Choose a file</label>
            <!-- <b-form-file ref="file" type="file" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..." accept="image/jpeg, image/png" @change=uploadImage></b-form-file> -->
          </div>
        </b-col>
      </b-row>
      <b-row>
        <!-- <b-col></b-col>
        <b-col></b-col> -->
        <b-col>
          <br>
          <div>
            <br>
            <b-button style="width:20%" variant="outline-primary" type="submit" v-on:click="send ()"><i class="fas fa-upload"></i></b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
// import VueJwtDecode from 'vue-jwt-decode'
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
        picture: null,
        status: 0
      },
      previewImage: null
    }
  },
  mounted () {
    this.prettycash.employee_id = JSON.parse(localStorage.getItem('username'))
  },
  methods: {
    uploadImage (e) {
      // this.previewImage = e.target.files[0]
      this.prettycash.picture = this.$refs.file.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(this.prettycash.picture)
      reader.onload = e => {
        this.previewImage = e.target.result
      }
    },
    send () {
      const formData = new FormData()
      formData.set('data', JSON.stringify(this.prettycash))
      formData.append('file', this.prettycash.picture)
      console.log(this.prettycash.picture)
      axios.post('http://localhost:4000/cash/post-prettycash', formData).then(respone => {
        console.log(respone)
        this.prettycash = {
          date: '',
          employee_id: JSON.parse(localStorage.getItem('username')),
          amount: '',
          service_charge: '',
          detail: '',
          picture: '',
          status: 0
        }
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
/* .inputfile + label {
  cursor: pointer;
} */
</style>
