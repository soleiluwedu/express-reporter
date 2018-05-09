const fs = require('fs');

const out = fs.createWriteStream('./express-reporter.out');
const err = fs.createWriteStream('./express-reporter.err');
const expressLogger = new console.Console({ stdout: out, stderr: err });

// settings object determines if the corresponding actions should occur.
const settings = {
  print: {
    type: 'boolean',
    value: true,
  },
  save: {
    type: 'boolean',
    value: false,
  },
};

// actions object contains functions to log messages.
const actions = {
  print: text => console.log(text),
  save: text => expressLogger.log(text),
};

/**
 * getSetting
 * @private
 * @param {string} option - Name of setting.
 * @returns {*} Value of setting from settings object.
 */
function getSetting(option) {
  return settings[option].value;
}

/**
 * saveSettings
 * @public
 * @param {Object} config - Object containing settings to save.
 * @returns {void}
 */
function saveSettings(config) {
  Object.keys(config).forEach((option) => {
    if (settings.hasOwnProperty(option)) {
      if (typeof config[option] !== settings[option].type) {
        throw new Error(`Setting '${option}' must be type '${settings[option].type}'`);
      }
      settings[option].value = config[option];
    }
  });
}

/**
 * logMessage
 * @private
 * @param {string} msg - Message to log.
 * @returns {void}
 */
function logMessage(textObj) {
  // Perform all actions that are toggled to 'true' in settings.
  if (getSetting('save')) actions.save(textObj.plain);
  if (getSetting('print')) actions.print(textObj.color);
}

module.exports.saveSettings = saveSettings;
module.exports.logMessage = logMessage;
