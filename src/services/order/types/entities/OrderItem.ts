import {
  ArrayMaxSize,
  ArrayMinSize,
  Entity,
  Id,
  IsUrl,
  Lengths,
  ManyToMany,
  MaxLength,
  NotUnique,
  ReadWrite,
  ShouldBeTrueForObject
} from 'backk';

import { OrderItemState } from '../enum/OrderItemState';
import ShoppingCartOrOrderSalesItem from '../../../shoppingcart/types/entities/ShoppingCartOrOrderSalesItem';

@Entity()
export default class OrderItem extends Id {
  @ManyToMany()
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
  @NotUnique()
  @ReadWrite()
  trackingUrl!: string | null;
}
