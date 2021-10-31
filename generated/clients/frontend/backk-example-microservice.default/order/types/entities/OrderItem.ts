// DO NOT MODIFY THIS FILE! This is an auto-generated file
import {
  ArrayMaxSize,
  ArrayMinSize,
  Id,
  IsUrl,
  Lengths,
  MaxLength,
  ReadWrite,
  ShouldBeTrueForObject,
} from 'backk-frontend-utils';
import ShoppingCartOrOrderSalesItem from '../../../shoppingcart/types/entities/ShoppingCartOrOrderSalesItem';
import { OrderItemState } from '../enum/OrderItemState';

export default class OrderItem extends Id {
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  @ReadWrite()
  salesItems!: ShoppingCartOrOrderSalesItem[];

  @ShouldBeTrueForObject<OrderItem>(
    ({ state, deliveryTimestamp }) =>
      (state === 'toBeDelivered' && deliveryTimestamp === null) ||
      (state !== 'toBeDelivered' && deliveryTimestamp !== null)
  )
  @ReadWrite()
  deliveryTimestamp!: Date | null;

  @ReadWrite()
  state!: OrderItemState;

  @MaxLength(Lengths._3K)
  @IsUrl()
  @ShouldBeTrueForObject<OrderItem>(
    ({ state, trackingUrl }) =>
      (state === 'toBeDelivered' && trackingUrl === null) ||
      (state !== 'toBeDelivered' && trackingUrl !== null)
  )
  @ReadWrite()
  trackingUrl!: string | null;
}
