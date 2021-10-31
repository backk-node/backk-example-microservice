// DO NOT MODIFY THIS FILE! This is an auto-generated file
import { ArrayMaxSize, ArrayMinSize, ReadOnly, _IdAndUserAccountId } from 'backk-frontend-utils';
import ShoppingCartOrOrderSalesItem from './ShoppingCartOrOrderSalesItem';

export default class ShoppingCart extends _IdAndUserAccountId {
  @ArrayMinSize(0)
  @ArrayMaxSize(50)
  @ReadOnly()
  salesItems!: ShoppingCartOrOrderSalesItem[];
}
