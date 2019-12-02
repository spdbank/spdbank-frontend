<template>
  <div ref="dragArea" class="uploader">
    <input type="file" class="visually-hidden">
    <button class="uploader__button">Загрузить Файл</button>
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
