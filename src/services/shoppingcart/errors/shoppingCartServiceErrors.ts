import { HttpStatusCodes } from 'backk';

export const shoppingCartServiceErrors = {
  salesItemReservedOrSold: {
    errorCode: 1,
    message: "Sales item is already in shopping cart, reserved in another user's shopping cart or sold",
    statusCode: HttpStatusCodes.BAD_REQUEST,
  },
};
