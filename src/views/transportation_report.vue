<template>
  <div>
    trans_report
    <b-container fluid="xl">
      <app-trans></app-trans>
    </b-container>
  </div>
</template>
<script>
import transreport from '../components/form_trans'
export default {
  components: {
    'app-trans': transreport
  }
}
</script>
<style>
</style>
