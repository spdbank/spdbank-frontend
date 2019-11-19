import { Model } from '@vuex-orm/core'
import User from '@/models/User'

export default class Account extends Model {
  static entity = 'accounts'

  static fields() {
    return {
      id: this.attr(null),
      user_id: this.attr(null),
      name: this.attr(''),
      description: this.attr(''),
      owner: this.belongsTo(User, 'user_id')
    }
  }
}
