import { Model } from '@vuex-orm/core'
import Operation from '@/models/Operation'

export default class Partner extends Model{
  static entity = 'partners'

  static fields(){
    return {
      id: this.increment(),
      name: this.string(),
      description: this.string(),
      operations: this.hasMany(Operation, 'partner_id'),
    }
  }
}
