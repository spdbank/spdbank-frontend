import User from '@/models/User'
import Category from '@/models/Category'
import Currency from '@/models/Currency'
import Partner from '@/models/Partner'
import Subcategory from '@/models/Subcategory'
import Account from '@/models/Account'
import Item from '@/models/Item'

import { parserModule } from '@/modules/parser.js'
import { transformer } from '@/modules/transformer.js'

export const importer = {
  async importHomebank(xmlHomebank){
    if(!xmlHomebank) return
    const jsonHomebank = parserModule.parse(xmlHomebank)
    const homebank = transformer.transform(jsonHomebank)
    if(!homebank) return
    await User.insert({data: homebank.users})
    await Currency.insert({data: homebank.currencies})
    await Account.insert({data: homebank.accounts})
    await Partner.insert({data: homebank.partners})
    await Category.insert({data: homebank.categories})
    await Subcategory.insert({data: homebank.subcategories})
    await Item.insert({data: homebank.items})
  }

}
