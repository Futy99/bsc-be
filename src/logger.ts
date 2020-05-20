import { ILogger } from '@qest/express-utils';

export const logger: ILogger = {
    fatal: (msg) => console.warn(msg),
    error: (msg) => console.warn(msg),
    warn: (msg) => console.warn(msg),
    info: (msg) => console.info(msg),
    debug: (msg) => console.debug(msg),
    trace: (msg) => console.trace(msg),
};
