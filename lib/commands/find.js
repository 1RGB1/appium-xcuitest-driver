import _ from 'lodash';
import { util } from 'appium-support';

let helpers = {}, commands = {}, extensions = {};

commands.findElement = async function (cmd, ...args) {
  return await this.findElOrEls(cmd, '/element', _.isArray(args) ? args[0] : args)
}

commands.findElements = async function (cmd, ...args) {
  return await this.findElOrEls(cmd, '/elements', _.isArray(args) ? args[0] : args)
}

helpers.findElOrEls = async function (cmd, endpoint, value) {
  if (cmd === '-ios predicate string') {
    // WebDriverAgent uses 'predicate string'
    cmd = 'predicate string';
  }

  let body = {
    'using' : cmd,
    'value' : value
  };

  let method = 'POST';
  return await this.wda.jwproxy.command(endpoint, method, body);
}


Object.assign(extensions, commands, helpers);
export { commands, helpers};
export default extensions;