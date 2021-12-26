import { JwtAuthorizationServiceImpl, MySqlDataStore, StartupCheckServiceImpl } from 'backk';
import Microservice from 'backk/lib/microservice/Microservice';
import AuditLoggingServiceImpl from './services/auditlogging/AuditLoggingServiceImpl';
import CaptchaVerificationServiceImpl from './services/captchaverification/CaptchaVerificationServiceImpl';
import LivenessCheckServiceImpl from './services/livenesscheck/LivenessCheckServiceImpl';
import OrderServiceImpl from './services/order/OrderServiceImpl';
import ResponseCacheConfigServiceImpl from './services/responsecacheconfig/ResponseCacheConfigServiceImpl';
import SalesItemServiceImpl from './services/salesitem/SalesItemServiceImpl';
import ShoppingCartServiceImpl from './services/shoppingcart/ShoppingCartServiceImpl';
import TagServiceImpl from './services/tag/TagServiceImpl';
import UserServiceImpl from './services/user/UserServiceImpl';
import UserAccountServiceImpl from './services/useraccount/UserAccountServiceImpl';

const dataStore = new MySqlDataStore();

// noinspection JSUnusedLocalSymbols
class MicroserviceImpl extends Microservice {
  private readonly auditLoggingService = new AuditLoggingServiceImpl();
  private readonly authorizationService = new JwtAuthorizationServiceImpl();
  private readonly captchaVerifyService = new CaptchaVerificationServiceImpl();
  private readonly livenessCheckService = new LivenessCheckServiceImpl();
  private readonly responseCacheConfigService = new ResponseCacheConfigServiceImpl();
  private readonly startupCheckService = new StartupCheckServiceImpl(dataStore);

  private readonly tagService = new TagServiceImpl(dataStore);
  private readonly userAccountService = new UserAccountServiceImpl(dataStore);
  private readonly userService = new UserServiceImpl(dataStore);
  private readonly salesItemService = new SalesItemServiceImpl(dataStore);
  private readonly shoppingCartService = new ShoppingCartServiceImpl(dataStore, this.salesItemService);
  private readonly orderService = new OrderServiceImpl(
    dataStore,
    this.salesItemService,
    this.shoppingCartService
  );

  constructor() {
    super(dataStore);
  }
}

const microservice = new MicroserviceImpl();
export default microservice;
