<template>
   <div>
      <img style="width:200px;hieght:200px" :src="previewImage" class="uploading-image" />
      <input name="avatar" ref="file" type="file" accept="image/jpeg, image/png" @change=uploadImage>
      <b-button type="button" v-on:click="sendFile ()">upload</b-button>
   </div>
</template>

<script>
import axios from 'axios'
import apiURL from '../assets/js/connectionAPI'
export default {
  name: 'imageUpload',
  data () {
    return {
      apiURL: apiURL,
      previewImage: null,
      image: null
    }
  },
  methods: {
    uploadImage (e) {
      // this.previewImage = e.target.files[0]
      this.image = this.$refs.file.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(this.image)
      reader.onload = e => {
        this.previewImage = e.target.result
      }
    },
    sendFile () {
      const formData = new FormData()
      const aa = {
        cc: 'aa'
      }
      formData.set('data', JSON.stringify(aa))
      formData.append('file', this.image)
      console.log(this.image)
      axios.post(this.apiURL + '/leavear/upload', formData).then(response => {
        console.log(response)
      })
    },
    onUpload () {
      const fd = new FormData()
      console.log(this.previewImage)
      fd.append('image', this.previewImage)
      axios.post(this.apiURL + '/leavear/upload', fd).then(response => {
        console.log(response)
      })
    }
  }
} // missing closure added
</script>
<style>
   .uploading-image{
     display:flex;
   }
 </style>
