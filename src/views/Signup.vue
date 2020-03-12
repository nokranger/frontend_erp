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
              <input type="text">
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">Name</div>
              <input type="text">
            </div>
          </b-col>
          <b-col>
            <div>
              <div class="align-left">Lastname</div>
              <input type="text">
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
            <select name="" id="">
              <option value="0">ผู้จัดการ</option>
            </select>
          </div>
        </b-col>
        <b-col>
          <div>
            <div class="align-left">Email</div>
            <input type="text">
          </div>
        </b-col>
        <b-col>
          <div>
            <div class="align-left">Tel.</div>
            <input type="text">
          </div>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <b-col>
          <div>
            <div class="align-left">Password</div>
            <input type="text">
          </div>
        </b-col>
        <b-col>
          <div>
            <div class="align-left">Work Start Date</div>
            <input type="text">
          </div>
        </b-col>
        <b-col>
        </b-col>
      </b-row>
    </b-container>
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cc: '#2c3e50'
    }
  },
  metaInfo () {
    return {
      title: 'Signup',
      titleTemplate: '%s - LPTT'
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
