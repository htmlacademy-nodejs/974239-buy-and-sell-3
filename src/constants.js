"use strict";

const DEFAULT_COMMAND = `--help`;

const ExitCode = {
  SUCCESS: 0,
  FAIL: 1,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

const NANO_ID_LENGTH = 6;

module.exports = {
  DEFAULT_COMMAND,
  NANO_ID_LENGTH,
  ExitCode,
  HttpCode,
  Env,
};
