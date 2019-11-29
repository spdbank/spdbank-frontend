import { Model } from '@vuex-orm/core'
import Item from '@/models/Item'
import Category from '@/models/Category'

import { relateProcessor } from '@/modules/relate_processor'

export default class Subcategory extends Model{
  static entity = 'subcategories'

  static fields(){
    return {
      id: this.increment(),
      category_id: this.number(),
      name: this.string(),
      items: this.hasMany(Item, 'subcategory_id'),
      category: this.belongsTo(Category, 'category_id'),
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
