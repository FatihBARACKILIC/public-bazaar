enum HttpStatusCode {
  // Success Status Codes
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  // Redirection Status Codes
  MOVED_PERMANENTLY = 301,
  FOUND = 302,

  // Client Error Status Codes
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,

  // Server Error Status Codes
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export default HttpStatusCode;
