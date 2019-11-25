export const inserter = {
  // foreign is array of objects like {
  //                                    prop_id: |property of main obj to save id
  //                                    prop: |property of main obj|,
  //                                    model: |foreign model|,
  //                                    key: |prop of foreign to find|
  //                                  }
  async insert(model, obj, foreign){
    let result
    if(obj instanceof Array){
      await Promise.all(obj.map(async o => await this.insertOne(model, o, foreign))
      ).then(results => result = results.map(res => res.accounts).flat())
    } else if(obj instanceof Object) {
      result = await this.insertOne(model, obj, foreign)
    }
    return result
  },

  async insertOne(model, obj, foreign){
    if(foreign instanceof Array){
      foreign.forEach(async foreignObj => await this.processForeignOne(obj, foreignObj))
    } else if(foreign instanceof Object){
      await this.processForeignOne(obj, foreign)
    }
    return await model.insert({ data: obj })
  },

  async processForeignOne(obj, foreign){
    let result = foreign.model.query().where(foreign.key, obj[foreign.prop][foreign.key]).get()
    if(result && result.length > 0) {
      obj[foreign.prop_id] = result.id
    } else {
      const newObj = await foreign.model.insert({ data: obj[foreign.prop]})
      obj[foreign.prop_id] = newObj.users[0].id
    }
    delete obj[foreign.prop]
  }
}
