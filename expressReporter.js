// util used for logging objects on the request object.
const util = require('util');
const stylized = require('./stylized.js');
const { logMessage, saveSettings } = require('./logger.js');

/**
 * request
 * @public
 * @param {Object} req - Natively passed in by Express.
 * @param {Object} res - Natively passed in by Express.
 * @param {Function} next - Natively passed in by Express.
 * @returns {void}
 */
function request(req, res, next) {
  // Log message will have two parts:
  // 1) basic info (req.method and req.url)
  // 2) additional info (req.params, req.query, req.body).
  let plain = `[${req.method} ${req.url}] request received`;
  let color = `${stylized.brackets(`${stylized.reqMETHOD(req.method)} ${stylized.url(req.url)}`)} request received`;

  // req.params always has '0': /req.url
  if (Object.keys(req.params).length > 1) {
    const plainParam = `req.params: ${util.inspect(req.params)}`;
    const colorParam = stylized.reqPARAMS(plainParam);
    plain += ` ${plainParam}`;
    color += ` ${colorParam}`;
  }
  if (Object.keys(req.query).length > 0) {
    const plainQuery = `req.query: ${util.inspect(req.query)}`;
    const colorQuery = stylized.reqQUERY(plainQuery);
    plain += ` ${plainQuery}`;
    color += ` ${colorQuery}`;
  }
  if (Object.keys(req.body).length > 0) {
    const plainBody = `req.body: ${util.inspect(req.body)}`;
    const colorBody = stylized.reqBODY(plainBody);
    plain += ` ${plainBody}`;
    color += ` ${colorBody}`;
  }

  logMessage({ plain, color });

  // Move to next middleware.
  return next();
}

/**
 * response
 * @public
 * @param {Object} req - Natively passed in by Express.
 * @param {Object} res - Natively passed in by Express.
 * @param {Function} next - Natively passed in by Express.
 * @returns {void}
 */
function response(req, res, next) {
  // Check res.locals.err for an error object.
  // (Must program controllers to save errors to res.locals.err)
  if (res.locals.err) {
    let plain = res.locals.err.message;
    let color = stylized.error(plain);
    plain = `❗ ${plain}`;
    color = `❗ ${color}`;
    logMessage({ plain, color });
  }
  // If no error, assume successful delivery of payload and log confirmation.
  // Check for custom msg in res.locals.successMsg first.
  else {
    const plain = res.locals.successMsg
      ? res.locals.successMsg
      : `[${req.method} ${req.url}] payload delivered`;
    const color = res.locals.successMsg
      ? res.locals.successMsg
      : `${stylized.brackets(`${stylized.reqMETHOD(req.method)} ${stylized.url(req.url)}`)} payload delivered`;
    logMessage({ plain, color });
  }

  return next();
}

/**
 * listenPort
 * @public
 * @param {number} port - Port number on which server is listening.
 * @returns {void}
 */
function listenPort(port) {
  const plain = `🤘 ready to rock on port ${port}`;
  const color = stylized.port(plain);
  logMessage({ plain, color });
}

module.exports.request = request;
module.exports.response = response;
module.exports.listenPort = listenPort;
module.exports.saveSettings = saveSettings;
