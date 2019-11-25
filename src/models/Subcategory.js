import { Model } from '@vuex-orm/core'
import Item from '@/models/Item'
import Category from '@/models/Category'

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
}
