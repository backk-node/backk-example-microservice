import { ArrayMaxSize, ArrayMinSize, _IdAndUserAccountId, Entity, ManyToMany, ReadOnly } from 'backk';
import ShoppingCartOrOrderSalesItem from './ShoppingCartOrOrderSalesItem';

@Entity()
export default class ShoppingCart extends _IdAndUserAccountId {
  @ManyToMany()
  @ArrayMinSize(0)
  @ArrayMaxSize(50)
  @ReadOnly()
  salesItems!: ShoppingCartOrOrderSalesItem[];
}
