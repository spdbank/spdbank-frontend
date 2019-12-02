export const dragDropModule = {
  addProxyDrag(fn){
    const handler = {
      apply: (target, thisArg, args) => {
        if(args && args[0] && args[0].dataTransfer &&
                args[0].dataTransfer &&
                args[0].dataTransfer.types){
          for (var i = 0; i < args[0].dataTransfer.types.length; i++) {
              if (args[0].dataTransfer.types[i] == "Files") {
                return target.apply(thisArg, args)
              }
          }
        }
      }
    }
    return new Proxy(fn, handler)
  },

  addDragEvents(self){
    const dragArea = self.$refs.dragArea
    window.addEventListener('dragover', this.addProxyDrag(this.handleWindowDragOver.bind(self)))
    window.addEventListener('dragleave', this.addProxyDrag(this.handleWindowDragLeave.bind(self)))
    window.addEventListener('drop', this.addProxyDrag(this.handleWindowDrop.bind(self)))
    dragArea.addEventListener('dragenter', this.addProxyDrag(this.handleAreaDragEnter.bind(self)))
    dragArea.addEventListener('dragover', this.addProxyDrag(this.handleAreaDragOver.bind(self)))
    dragArea.addEventListener('dragleave', this.addProxyDrag(this.handleAreaDragLeave.bind(self)))
    dragArea.addEventListener('drop', this.addProxyDrag(this.handleAreaDrop.bind(self)))
  },

  async handleAreaDragEnter(e){
    e.preventDefault()
    e.stopPropagation()
    const dragArea = this.$refs.dragArea
    if(dragArea){
      dragArea.classList.add('uploader--drag-area', 'uploader--drag-over')
      dragArea.classList.remove('uploader--drag-out')
    }
  },

  async handleAreaDragOver(e){
    e.preventDefault()
    e.stopPropagation()
    const dragArea = this.$refs.dragArea
    if(dragArea){
      dragArea.classList.add('uploader--drag-area', 'uploader--drag-over')
      dragArea.classList.remove('uploader--drag-out')
    }
  },

  handleAreaDragLeave(e){
    e.preventDefault()
    e.stopPropagation()
    const dragArea = this.$refs.dragArea
    if(dragArea){
      dragArea.classList.add('uploader--drag-area', 'uploader--drag-out')
      dragArea.classList.remove('uploader--drag-over')
    }
  },

  async handleAreaDrop(e){
    e.preventDefault()
    e.stopPropagation()
    const dragArea = this.$refs.dragArea
    const file = e.dataTransfer.files[0]
    if(file){
      this.importXmlHomebank(await file.text('xml'))
    }
    if(dragArea){
      dragArea.classList.remove('uploader--drag-over', 'uploader--drag-area', 'uploader--drag-out')
    }
  },

  handleWindowDragOver(e){
    e.preventDefault()
    const dragArea = this.$refs.dragArea
    if(dragArea){
      dragArea.classList.add('uploader--drag-area', 'uploader--drag-out')
      dragArea.classList.remove('uploader--drag-over')
    }
  },

  handleWindowDrop(e){
    e.preventDefault()
    const dragArea = this.$refs.dragArea
    if(dragArea){
      dragArea.classList.remove('uploader--drag-over', 'uploader--drag-area', 'uploader--drag-out')
    }
  },

  handleWindowDragLeave(e){
    e.preventDefault()
    e.stopPropagation()
    const dragArea = this.$refs.dragArea
    if(dragArea){
      dragArea.classList.remove('uploader--drag-over', 'uploader--drag-area', 'uploader--drag-out')
    }
  },
}
