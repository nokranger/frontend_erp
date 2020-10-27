<template>
  <div>
    <div>
      <b-container fluid="xl">
        <div style="font-size:30px;">
          Leave Form
        </div>
        <app-leave></app-leave>
      </b-container>
    </div>
  </div>
</template>
<script>
import leaveReport from '../components/form_leave_report'
export default {
  components: {
    'app-leave': leaveReport
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
