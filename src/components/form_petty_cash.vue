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
            <b-form-input type="date"></b-form-input>
          </div>
        </b-col>
        <b-col>
          <div class="align-left">
            Request by
          </div>
          <b-form-input type="text" placeholder="Request (EmpID)"></b-form-input>
        </b-col>
        <b-col>
          <b-row>
          <b-col>
            <div class="align-left">
              Net Expense
              <b-form-input type="text"></b-form-input>
            </div>
          </b-col>
          <b-col>
            <div class="align-left">
              Remaining
              <b-form-input type="text"></b-form-input>
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
            <b-button style="width:20%" variant="outline-primary" v-on:click="send ()"><i class="fas fa-upload"></i></b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    send () {
      console.log('send')
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
