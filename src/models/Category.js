import { Model } from '@vuex-orm/core'
import Subcategory from '@/models/Subcategory'

export default class Category extends Model{
  static entity = 'categories'

  static fields(){
    return {
      id: this.increment(),
      name: this.string(),
      subcategories: this.hasMany(Subcategory, 'subcategory_id'),
    }
  }
}
