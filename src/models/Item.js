import { Model } from '@vuex-orm/core'
import Subcategory from '@/models/Subcategory'
import Operation from '@/models/Operation'

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
}
