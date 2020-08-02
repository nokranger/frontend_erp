<template>
  <div>
    testpdf
    <b-button v-on:click="pdfPreview ()">preview</b-button>
    <b-button v-on:click="pdfPrint ()">download</b-button>
  </div>
</template>
<script>
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}
export default {
  data () {
    return {
      // content: 'Test Pdf preview'
    }
  },
  methods: {
    pdfPrint () {
      var dd = {
        content: [
          {
            text: 'สวัสดี', fontSize: 50
          }
        ],
        defaultStyle: {
          font: 'THSarabunNew'
        }
      }
      pdfMake.createPdf(dd).download()
    },
    pdfPreview () {
      var dd = {
        content: [
          {
            text: 'สวัสดีชาวโลก', fontSize: 50
          },
          {
            style: 'tableExample',
            table: {
              body: [
                ['Column 1', 'Column 2', 'Column 3'],
                ['One value goes here', 'Another one here', 'OK?']
              ]
            }
          }
        ],
        defaultStyle: {
          font: 'THSarabunNew'
        }
      }
      pdfMake.createPdf(dd).open()
    }
  }
}
</script>
<style>
</style>
