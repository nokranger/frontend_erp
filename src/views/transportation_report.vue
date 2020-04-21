<template>
  <div>
    <div>
    <b-container fluid="xl">
      <div style="font-size:30px;">
        ใบเบิกค่าใช้จ่ายสำหรับเดินทาง
      </div>
      <app-trans></app-trans>
    </b-container>
    </div>
  </div>
</template>
<script>
import transreport from '../components/form_trans'
export default {
  components: {
    'app-trans': transreport
  },
  data () {
    return {}
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
