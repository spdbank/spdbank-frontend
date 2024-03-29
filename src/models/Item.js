import { Model } from '@vuex-orm/core'
import Subcategory from '@/models/Subcategory'
import Operation from '@/models/Operation'

import { relateProcessor } from '@/modules/relate_processor'

export default class Item extends Model{
  static entity = 'items'

  static fields(){
    return {
      id: this.increment(),
      subcategory_id: this.number(),
      operation_id: this.number(),
      description: this.string(),
      amount: this.number(),
      subcategory: this.belongsTo(Subcategory, 'subcategory_id'),
      operation: this.belongsTo(Operation, 'operation_id'),
    }
  }

  static async insert(...args){
    await this.processRelates(args[0].data)
    return await super.insert(...args)
  }

  static async processRelates(data){
    if(data instanceof Array){
      let result = []
      for(let i = 0; i < data.length; i++){
        const d = data[i]
        result.push(await relateProcessor.processManyRelate(this, d))
      }
      return result
    } else {
      return await relateProcessor.processManyRelate(this, data)
    }
  }
}
