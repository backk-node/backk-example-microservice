import { HttpStatusCodes } from 'backk';

export const orderServiceErrors = {
  cannotRemoveDeliveredOrderItem: {
    errorCode: 1,
    message: 'Cannot remove delivered order item',
    statusCode: HttpStatusCodes.BAD_REQUEST,
  },
  invalidOrderItemCurrentState: {
    errorCode: 2,
    message: 'Cannot update order item state due to invalid current state',
    statusCode: HttpStatusCodes.BAD_REQUEST,
  },
  deliveredOrderDeleteNotAllowed: {
    errorCode: 3,
    message: 'Deleting order is not allowed when some or all of order items have been delivered',
    statusCode: HttpStatusCodes.BAD_REQUEST,
  },
  orderAlreadyPaid: {
    errorCode: 4,
    message: 'Order already paid',
    statusCode: HttpStatusCodes.BAD_REQUEST,
  },
  orderItemAlreadyDelivered: {
    errorCode: 5,
    message: 'Cannot deliver order item which is already delivered',
    statusCode: HttpStatusCodes.BAD_REQUEST,
  },
  cannotUpdateOrderWhichIsNotPaid: {
    errorCode: 6,
    message: 'Cannot update order which is not paid',
    statusCode: HttpStatusCodes.BAD_REQUEST,
  },
  shoppingCartIsEmpty: {
    errorCode: 7,
    message: 'Cannot place order because shopping cart is empty',
    statusCode: HttpStatusCodes.BAD_REQUEST,
  },
  notAgreedWithTermsAndConditions: {
    errorCode: 8,
    message: 'Terms and conditions were not agreed with',
    statusCode: HttpStatusCodes.BAD_REQUEST,
  },
};
