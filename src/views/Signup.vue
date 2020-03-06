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
            <div id="idcustomer">
              <label>Customer ID </label><br>
              <input type="text">
            </div>
          </b-col>
          <b-col>
            <div>
              <label>Name</label><br>
              <input type="text">
            </div>
          </b-col>
          <b-col>
            <div>
              <label>Lastname</label><br>
              <input type="text">
            </div>
          </b-col>
        </b-row>

      </b-container>
    <b-container>
      <b-row>
    <div>
      <label>ตำแหน่งการทำงาน</label><br>
      <!-- <input type="text"> -->
      <select name="" id="">
        <option value="0">ผู้จัดการ</option>
      </select>
    </div>
    <div>
      <label>Email</label><br>
      <input type="text">
    </div>
        <div>
      <label>Tel.</label><br>
      <input type="text">
    </div>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <div>
          <label>Password</label><br>
          <input type="text">
        </div>
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
  background-image: url("https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).jpg");
  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
