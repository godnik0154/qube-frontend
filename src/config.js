let environment = true;

const moduleConfig = {
    PROD_API_URL: 'http://18.237.28.27:8080',
    DEV_API_URL: 'http://localhost:8080'
}

export const API_URL = environment ? moduleConfig.PROD_API_URL : moduleConfig.DEV_API_URL;