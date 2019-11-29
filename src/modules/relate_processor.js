export const relateProcessor = {
  // foreign is array of objects like {
  //              prop_id: |property of main obj to save id
  //              prop: |property of main obj|,
  //              model: |foreign model|,
  //              keys: |prop of foreign to find|
  //           }
  // async processManyRelate(model, obj, foreign){
  async processManyRelate(model, obj){
    const foreign = await this.makeForeign(model, obj)
    if(obj instanceof Array){
      await obj.map(async o =>await this.insertOne(model, o, foreign))
    } else if(obj instanceof Object) {
      await this.insertOne(obj, foreign)
    }
    return obj
  },

  async makeForeign(model, obj){
    const fields = model.fields()
    const belongsToProps = Object.keys(obj).filter(prop => fields[prop] && fields[prop].constructor.name == 'BelongsTo')
    const result = belongsToProps.map(prop => obj[prop] ? ({ prop: prop }) : null).filter(foreign => foreign)
    await result.forEach(async foreign => {
      foreign.prop_id = await fields[foreign.prop].foreignKey
      foreign.model = fields[foreign.prop].parent
      foreign.keys = Object.keys(obj[foreign.prop]).filter(key => !['BelongsTo'].includes(foreign.model.fields()[key].constructor.name))
    })
    return result
  },

  async insertOne(obj, foreign){
    if(foreign instanceof Array){
      for(let i = 0; i < foreign.length; i++){
        const foreignObj = foreign[i]
        await this.processForeignOne(obj, foreignObj)
      }
    } else if(foreign instanceof Object){
      await this.processForeignOne(obj, foreign)
    }
  },

  async processForeignOne(obj, foreign){
    await this.setForeignOneId(obj, foreign, await this.findForeignOne(obj, foreign))
  },

  async findForeignOne(obj, foreign){
    let foundForeignObjects
    if(foreign.keys instanceof Array){
      foundForeignObjects = await foreign.model.query().where((foreignObj) => {
        return foreign.keys.reduce((res, key) => res && foreignObj[key] == obj[foreign.prop][key], true)
      }).get()
    } else if(typeof foreign.keys === 'string'){
      foundForeignObjects = await foreign.model.query().where(foreign.keys, obj[foreign.prop][foreign.keys]).get()
    } else {
      throw('keys of related object are abscent')
    }
    return foundForeignObjects
  },

  async setForeignOneId(obj, foreign, foundForeignObjects){
    if(foundForeignObjects && foundForeignObjects.length > 0) {
      obj[foreign.prop_id] = foundForeignObjects[0].id
    } else {
      const newObj = await foreign.model.insert({ data: obj[foreign.prop]})
      obj[foreign.prop_id] = await newObj[foreign.model.entity][0].id
    }
    await delete obj[foreign.prop]
  },
}
