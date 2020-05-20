import { corsSetup, server } from '@qest/express-utils';
import * as firebaseAdmin from 'firebase-admin';

import { logger } from './logger';
import { router } from './router';

const serviceAccount = require('../../src/firebaseServiceKey.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

export const databaseInstance = firebaseAdmin.firestore();

const expressServer = server(
    {
        logger,
        router,
        preMiddleware: [corsSetup('*')],
    },
    {
        useDefaultMiddlewares: true,
    },
);

const listen = () => {
    return expressServer
        .listen(process.env.PORT || 8080, () => {
            logger.info('[Express] Listening at 8080');
        })
        .on('error', (e) => logger.error(e));
};
listen();
