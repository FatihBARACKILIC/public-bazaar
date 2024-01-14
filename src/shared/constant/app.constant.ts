export const APP_NAME = "Public Bazaar";

export const VERSION = process.env.npm_package_version?.split(".").at(0);
export const API_URL = `/api/v${VERSION}/`;
