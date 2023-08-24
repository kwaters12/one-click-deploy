import { DefaultLogger, dummyPaymentHandler, LogLevel, UuidIdStrategy, VendureConfig } from '@vendure/core';
import 'dotenv/config';
import path from 'path';
import { plugins } from './vendure-config-plugins';

const IS_DEV = process.env.APP_ENV === 'dev';

export const config: VendureConfig = {
	apiOptions: {
			port: 3000,
			adminApiPath: 'admin-api',
			shopApiPath: 'shop-api',
			// The following options are useful in development mode,
			// but are best turned off for production for security
			// reasons.
			...(IS_DEV ? {
					adminApiPlayground: {
							settings: { 'request.credentials': 'include' } as any,
					},
					adminApiDebug: true,
					shopApiPlayground: {
							settings: { 'request.credentials': 'include' } as any,
					},
					shopApiDebug: true,
			} : {}),
	},
	authOptions: {
			tokenMethod: ['bearer', 'cookie'],
			superadminCredentials: {
					identifier: process.env.SUPERADMIN_USERNAME,
					password: process.env.SUPERADMIN_PASSWORD,
			},
			cookieOptions: {
				secret: process.env.COOKIE_SECRET,
			},
	},
	dbConnectionOptions: {
			type: 'postgres',
			// See the README.md "Migrations" section for an explanation of
			// the `synchronize` and `migrations` options.
			synchronize: Boolean(process.env.SYNCHRONIZE_DATA) || true,
			migrations: [path.join(__dirname, './migrations/*.+(ts|js)')],
			logging: false,
			database: process.env.DB_NAME,
			schema: process.env.DB_SCHEMA,
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			// ssl: Boolean(process.env.USE_SSL) || false,
			ssl: {
					rejectUnauthorized: false,
					requestCert: true
			}
	},
    entityOptions: {
        entityIdStrategy: new UuidIdStrategy(),
    },
	paymentOptions: {
			paymentMethodHandlers: [dummyPaymentHandler],
	},
	// When adding or altering custom field definitions, the database will
	// need to be updated. See the "Migrations" section in README.md.
	customFields: {
			Product: [{
					name: 'test',
					type: 'string',
			}]
	},
	plugins,
	logger: new DefaultLogger({ level: LogLevel.Debug }),
};