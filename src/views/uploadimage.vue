<template>
   <div>
      <img :src="previewImage" class="uploading-image" />
      <input type="file" accept="image/jpeg, image/png" @change=uploadImage>
      <b-button type="button" v-on:click="onUpload()">upload</b-button>
   </div>
</template>

<script>
export default {
  name: 'imageUpload',
  data () {
    return {
      previewImage: null
    }
  },
  methods: {
    uploadImage (e) {
      this.previewImage = e.target.files[0]
      // const reader = new FileReader()
      // reader.readAsDataURL(image)
      // reader.onload = e => {
      //   this.previewImage = e.target.result
      //   console.log(this.previewImage)
      // }
    },
    onUpload () {
      const fd = new FormData()
      fd.append('image', this.previewImage, this.previewImage.name)
      console.log(fd)
    }
  }
} // missing closure added
</script>
<style>
   .uploading-image{
     display:flex;
   }
 </style>
