<template>
  <div>
    <h1>Request Forms</h1>
    <b-container fluid="xl">
      <br>
      <b-container>
        <b-row>
          <b-col>
            <div class="card">
              <!-- <img src="https://i.imgur.com/pdfcCXr.png" class="card-img-top" alt="map ckb"> -->
              <br>
              <div class="card-body">
                <!-- <h5 class="card-title"><i class="fa fa-location-arrow" aria-hidden="true"></i> {{titleOA}}</h5> -->
                <!-- <p class="card-text">{{detailOA}}</p><br> -->
                <a href="/leavereport"><h5>Leave</h5></a>
                <!-- <p>ลากิจ - อนุสรณ์ - ยังไม่อนุมัติ</p> -->
                <div class="align-right">
                  <!-- <button class="button"><a class="linkmap" target="_blank" v-bind:href="linkOA"><img style="width:50px;height:50px;" src="https://i.imgur.com/JKjVDrz.png" alt="map ckb"></a></button> -->
                </div>
              </div>
            </div>
          </b-col>
          <b-col>
            <div class="card">
              <!-- <img src="https://i.imgur.com/pdfcCXr.png" class="card-img-top" alt="map ckb"> -->
              <br>
              <div class="card-body">
                <!-- <h5 class="card-title"><i class="fa fa-location-arrow" aria-hidden="true"></i> {{titleOA}}</h5> -->
                <!-- <p class="card-text">{{detailOA}}</p><br> -->
                <a href="/transreport"><h5>Transportation</h5></a>
                <!-- <p>ลากิจ - อนุสรณ์ - ยังไม่อนุมัติ</p> -->
                <div class="align-right">
                  <!-- <button class="button"><a class="linkmap" target="_blank" v-bind:href="linkOA"><img style="width:50px;height:50px;" src="https://i.imgur.com/JKjVDrz.png" alt="map ckb"></a></button> -->
                </div>
              </div>
            </div>
          </b-col>
          <b-col>
            <div class="card">
              <!-- <img src="https://i.imgur.com/pdfcCXr.png" class="card-img-top" alt="map ckb"> -->
              <br>
              <div class="card-body">
                <!-- <h5 class="card-title"><i class="fa fa-location-arrow" aria-hidden="true"></i> {{titleOA}}</h5> -->
                <!-- <p class="card-text">{{detailOA}}</p><br> -->
                <a href="/pettycash"><h5>Petty cash</h5></a>
                <!-- <p>ลากิจ - อนุสรณ์ - ยังไม่อนุมัติ</p> -->
                <div class="align-right">
                  <!-- <button class="button"><a class="linkmap" target="_blank" v-bind:href="linkOA"><img style="width:50px;height:50px;" src="https://i.imgur.com/JKjVDrz.png" alt="map ckb"></a></button> -->
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  metaInfo () {
    return {
      title: 'Request forms',
      titleTemplate: '%s - LPTT'
    }
  },
  beforeCreate () {
    var localjwt = localStorage.getItem('jwt')
    if (localjwt !== null) {
    } else {
      location.replace('/')
    }
  },
  created () {},
  mounted () {
    setInterval(this.checkExpire, 150000)
  },
  methods: {
    checkPermission () {
      if (JSON.parse(localStorage.getItem('jwt')) !== 'null') {
        console.log('login agian')
      } else {
        console.log('login agian 2')
      }
    },
    checkExpire () {
      console.log('check expire')
      if (Date.now() >= parseInt(localStorage.getItem('iat'), 10) + 600000) {
        console.log('10min')
        console.log('logout')
        localStorage.removeItem('iat')
        localStorage.removeItem('username')
        localStorage.removeItem('jwt')
        localStorage.removeItem('role')
        location.replace('/')
      } else {
        console.log('not expire')
      }
    }
  }
}
</script>
<style scoped>
</style>
