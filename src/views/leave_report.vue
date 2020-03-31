<template>
  <div>
    <div>
      <b-container fluid="xl">
        leave report
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
<style>
</style>
