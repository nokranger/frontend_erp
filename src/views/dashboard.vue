<template>
  <div>
    dashboard
  </div>
</template>
<script>
export default {
  data () {
    return {
      isTrue: true,
      symbols: '&#9776;'
    }
  },
  metaInfo () {
    return {
      title: 'Dashboard',
      titleTemplate: '%s - LPTT'
    }
  },
  methods: {
    openNav () {
      var el = document.getElementById('mySidenav')
      if (el.style.width === '250px') {
        el.style.width = '0px'
        this.symbols = '&#9776;'
      } else {
        el.style.width = '250px'
        this.symbols = '&times;'
      }
    },

    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
    }
  }
}
</script>
<style scoped src="@/assets/css/dashboard.css">
</style>
