import { Model } from '@vuex-orm/core'

export default class Item extends Model{
  static entity = 'items'

  static fields(){
    return {
      id: this.increment(),
      subcategory_id: this.number(),
      operation_id: this.number(),
      description: this.string(),
      amount: this.number(),
    }
  }
}
