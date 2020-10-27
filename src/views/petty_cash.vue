<template>
  <div>
    <app-petty></app-petty>
  </div>
</template>
<script>
import pettycash from '../components/form_petty_cash'
export default {
  components: {
    'app-petty': pettycash
  },
  data () {},
  metaInfo () {
    return {
      title: 'Petty Cash',
      titleTemplate: '%s - LPTT'
    }
  }
}
</script>
<style scoped>
</style>
