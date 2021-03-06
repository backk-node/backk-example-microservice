import { AuditLoggingService } from 'backk';

export default class AuditLoggingServiceImpl extends AuditLoggingService {
  log(): Promise<void> {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'integration') {
      return Promise.resolve();
    } else {
      // Send audit log entry here to a remote audit log server using e.g. makeHttpRequest()
      throw new Error('Audit logging service not implemented');
    }
  }
}
