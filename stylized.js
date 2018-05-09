// ansi 16 color style codes for the terminal.
const ansi16 = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  standout: '\x1b[3m',
  underline: '\x1b[4m',
  blink: '\x1b[5m',
  inverse: '\x1b[7m',
  hidden: '\x1b[8m',
  nobright: '\x1b[22m',
  nostandout: '\x1b[23m',
  nounderline: '\x1b[24m',
  noblink: '\x1b[25m',
  noinverse: '\x1b[27m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bg_black: '\x1b[40m',
  bg_red: '\x1b[41m',
  bg_green: '\x1b[42m',
  bg_yellow: '\x1b[43m',
  bg_blue: '\x1b[44m',
  bg_magenta: '\x1b[45m',
  bg_cyan: '\x1b[46m',
  bg_white: '\x1b[47m',
};

// ansi 256 color style codes for the terminal.
const ansi256 = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  standout: '\x1b[3m',
  underline: '\x1b[4m',
  blink: '\x1b[5m',
  inverse: '\x1b[7m',
  hidden: '\x1b[8m',
  nobright: '\x1b[22m',
  nostandout: '\x1b[23m',
  nounderline: '\x1b[24m',
  noblink: '\x1b[25m',
  noinverse: '\x1b[27m',
  black: '\x1b[38;5;0m',
  red: '\x1b[38;5;196m',
  green: '\x1b[38;5;36m',
  yellow: '\x1b[38;5;208m',
  blue: '\x1b[38;5;39m',
  magenta: '\x1b[38;5;129m',
  cyan: '\x1b[38;5;39m',
  white: '\x1b[38;5;255m',
  bg_black: '\x1b[48;5;0m',
  bg_red: '\x1b[48;5;196m',
  bg_green: '\x1b[48;5;36m',
  bg_yellow: '\x1b[48;5;208m',
  bg_blue: '\x1b[48;5;39m',
  bg_magenta: '\x1b[48;5;129m',
  bg_cyan: '\x1b[48;5;39m',
  bg_white: '\x1b[48;5;255m',
};

// Change this variable to point to another color code object
let style = ansi256;

// Style associations.
const msgDecor = {
  brackets: `${style.cyan}${style.bright}`,
  default: `${style.cyan}`,
  error: `${style.red}`,
  port: `${style.green}${style.underline}`,
  url: `${style.yellow}`,
  reqMETHOD: `${style.cyan}`,
  reqPARAMS: `${style.yellow}`,
  reqQUERY: `${style.blue}`,
  reqBODY: `${style.magenta}`,
};

// stylized object contains functions that accept strings and returns stylized strings.
const stylized = {
  brackets: string => `${msgDecor.brackets}[${style.reset}${string}${msgDecor.brackets}]${style.reset}`,
  default: string => `${msgDecor.default}${string}${style.reset}`,
  error: string => `${msgDecor.error}${string}${style.reset}`,
  port: string => `${msgDecor.port}${string}${style.reset}`,
  url: string => `${msgDecor.url}${string}${style.reset}`,
  reqMETHOD: string => `${msgDecor.reqMETHOD}${string}${style.reset}`,
  reqPARAMS: string => `${msgDecor.reqPARAMS}${string}${style.reset}`,
  reqQUERY: string => `${msgDecor.reqQUERY}${string}${style.reset}`,
  reqBODY: string => `${msgDecor.reqBODY}${string}${style.reset}`,
  setColors: (num) => {
    switch (num) {
      case 16:
        style = ansi16;
        break;
      case 256:
        style = ansi16;
        break;
      default:
        throw new Error('\'setColors\' method must receive argument of either 16 or 256');
    }
  },
};

function combineLogMsgs(logArray) {
  return logArray.reduce((accmLogObj, currLogObj) => {
    if (currLogObj.color) accmLogObj.color += ` ${currLogObj.color}`;
    if (currLogObj.plain) accmLogObj.plain += ` ${currLogObj.plain}`;
    return accmLogObj;
  }, { color: '', plain: '' });
}

module.exports = stylized;
