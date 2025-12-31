import { defineConfig } from '@hairy/lnv'

const config = defineConfig({
  /**
   * Environment variable injection, applied to all LNV scripts
   */
  injects: {
    /**
     * Inject before reading environment variables
     */
    before: {
      DB_TYPE: 'mysql',
      DB_USER: 'root',
      DB_HOST: 'localhost',
      DB_PORT: '3306',
    },

    /**
     * Inject after reading environment variables
     */
    after: {
      DATABASE_URL: '$DB_TYPE://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME?connection_limit=5&pool_timeout=20',
    },
  },
})

export default config
