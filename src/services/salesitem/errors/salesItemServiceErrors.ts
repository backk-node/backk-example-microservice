import { HttpStatusCodes } from 'backk';

export const salesItemServiceErrors = {
  maximumSalesItemCountPerUserExceeded: {
    errorCode: 1,
    message: 'Maximum sales item count exceeded. Maximum 100 active sales items allowed',
    statusCode: HttpStatusCodes.BAD_REQUEST,
  },
  salesItemStateIsNotForSale: {
    errorCode: 2,
    message: "Sales item update failed, because sales item state was not 'for sale'",
    statusCode: HttpStatusCodes.BAD_REQUEST,
  },
  invalidSalesItemState: {
    errorCode: 3,
    message: 'Invalid sales item state',
    statusCode: HttpStatusCodes.BAD_REQUEST,
  },
};
