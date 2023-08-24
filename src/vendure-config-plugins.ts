import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import {
  DefaultJobQueuePlugin,
  DefaultSearchPlugin, VendureConfig
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import 'dotenv/config';
import path from 'path';

export const plugins: VendureConfig['plugins'] = [
  AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: path.join(__dirname, '../static/assets'),
  }),
  DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
  DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
  EmailPlugin.init({
      devMode: true,
      outputPath: path.join(__dirname, '../static/email/test-emails'),
      route: 'mailbox',
      handlers: defaultEmailHandlers,
      templatePath: path.join(__dirname, '../static/email/templates'),
      globalTemplateVars: {
          // The following variables will change depending on your storefront implementation.
          // Here we are assuming a storefront running at http://localhost:8080.
          fromAddress: '"example" <noreply@example.com>',
          verifyEmailAddressUrl: 'http://localhost:8080/verify',
          passwordResetUrl: 'http://localhost:8080/password-reset',
          changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
      },
  }),
  AdminUiPlugin.init({
      route: 'admin',
      port: 3002,
  }),
        // HardenPlugin.init({
        //     maxQueryComplexity: 500,
        //     apiMode: IS_DEV ? 'dev' : 'prod',
        // }),
]