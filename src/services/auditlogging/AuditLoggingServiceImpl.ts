import { AuditLoggingService } from 'backk';

export default class AuditLoggingServiceImpl implements AuditLoggingService {
  log(): Promise<void> {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'integration') {
      return Promise.resolve();
    } else {
      // TODO: Send audit log entry here to a remote audit log server using e.g. callRemoteService() or sendToRemoteService()
      throw new Error('Audit logging service not implemented');
    }
  }
}
