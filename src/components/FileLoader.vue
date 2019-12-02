<template>
  <div ref="dragArea" class="uploader">
    <label class="uploader__button">
      Загрузить Файл
      <input @change="handleFileChange" ref="input" tabindex="-1" type="file" class="visually-hidden">
    </label>
    <button></button>
  </div>
</template>

<script>
import { dragDropModule } from '@/modules/drag-n-drop'
import { importer } from '@/modules/importer'

export default {
  name: 'FileLoader',
  data() {
    return {
      loader: false,
    };
  },
  mounted(){
    this.addEventHandlers()
  },
  methods:{
    async handleFileChange(e){
      const input = e.target
      if(input.files.length > 0 && input.files[0].type === 'application/x-homebank'){
        const xmlHomebank = await input.files[0].text()
        this.importXmlHomebank(xmlHomebank)
      }
    },
    addEventHandlers(){
      dragDropModule.addDragEvents(this)
    },
    async importXmlHomebank(xmlHomebank){
      this.loader = true
      await importer.importHomebank(xmlHomebank)
      this.loader = false
    }
  },
};
</script>

<style scoped lang="scss" src="@/styles/FileLoader.scss">

</style>
