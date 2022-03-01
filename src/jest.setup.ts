import 'reflect-metadata';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Expect {
      hookToBeCalled(): CustomMatcherResult;
    }
  }
}

expect.extend({
  hookToBeCalled(received) {
    if (typeof received === 'function') {
      received();
    } else if (typeof received === 'object') {
      let shouldExecutePreHook = true;
      if ('executePreHookIf' in received && typeof received.executePreHookIf === 'function') {
        shouldExecutePreHook = received.executePreHookIf();
      }
      if (
        shouldExecutePreHook &&
        'shouldSucceedOrBeTrue' in received &&
        typeof received.shouldSucceedOrBeTrue === 'function'
      ) {
        received.shouldSucceedOrBeTrue();
      }
    } else {
      return {
        message: () => 'Expected a Backk hook, did not receive a valid hook',
        pass: false,
      };
    }
    return {
      message: () => '',
      pass: true,
    };
  },
  hookToBeCalledWithEntity(received, entity) {
    if (typeof received === 'function') {
      received(entity);
    } else if (typeof received === 'object') {
      let shouldExecuteHook = true;
      if ('executePreHookIf' in received && typeof received.executePreHookIf === 'function') {
        shouldExecuteHook = received.executePreHookIf(entity);
      } else if ('executePostHookIf' in received && typeof received.executePostHookIf === 'function') {
        shouldExecuteHook = received.executePostHookIf(entity);
      }
      if (
        shouldExecuteHook &&
        'shouldSucceedOrBeTrue' in received &&
        typeof received.shouldSucceedOrBeTrue === 'function'
      ) {
        received.shouldSucceedOrBeTrue(entity);
      }
    } else {
      return {
        message: () => 'Expected a Backk hook, did not receive a valid hook',
        pass: false,
      };
    }
    return {
      message: () => '',
      pass: true,
    };
  },
  hookToBeCalledWithEntities(received, entities) {
    if (typeof received === 'function') {
      received(entities);
    } else if (typeof received === 'object') {
      let shouldExecuteHook = true;
      if ('executePreHookIf' in received && typeof received.executePreHookIf === 'function') {
        shouldExecuteHook = received.executePreHookIf(entities);
      } else if ('executePostHookIf' in received && typeof received.executePostHookIf === 'function') {
        shouldExecuteHook = received.executePostHookIf(entities);
      }
      if (
        shouldExecuteHook &&
        'shouldSucceedOrBeTrue' in received &&
        typeof received.shouldSucceedOrBeTrue === 'function'
      ) {
        received.shouldSucceedOrBeTrue(entities);
      }
    } else {
      return {
        message: () => 'Expected a Backk hook, did not receive a valid hook',
        pass: false,
      };
    }
    return {
      message: () => '',
      pass: true,
    };
  },
});
