const colorReset = "\x1b[0m";
const bgColorBlue = "\x1b[44m";
const textColorBlue = "\x1b[34m";
const bgColorYellow = "\x1b[43m";
const textColorYellow = "\x1b[93m";
const bgColorRed = "\x1b[41m";
const textColorRed = "\x1b[91m";
const bgColorGreen = "\x1b[42m";
const textColorGreen = "\x1b[32m";

let logEnabled = false;

export const setLogState = (state: any) => {
  logEnabled = state;
};

function printMessage(backgroundColor: string, textColor: string, prefixMessage: string, message: string) {
  if (logEnabled) {
    console.log(
      `${backgroundColor}${prefixMessage}${colorReset} ${textColor}${message}${colorReset}`
    );
  }
};

export const log = {
  info: (message: string) =>
    printMessage(bgColorBlue, textColorBlue, "### INFO ###", message),
  warning: (message: string) =>
    printMessage(bgColorYellow, textColorYellow, "### WARNING ###", message),
  error: (message: string) =>
    printMessage(bgColorRed, textColorRed, "### ERROR ###", message),
  success: (message: string) =>
    printMessage(bgColorGreen, textColorGreen, "### SUCCESS ###", message),
};

