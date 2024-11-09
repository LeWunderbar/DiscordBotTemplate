const {config} = require("../../configurator")

const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');
const log = require("../../utils/log")

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      config.TEST_SERVER
    );

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          log(`\x1b[38;2;67;170;139m[Slash] \x1b[32m${name}\x1b[0m has been deleted.`)
          continue;
        } else {
          log(`\x1b[38;2;67;170;139m[Slash] \x1b[32m${name}\x1b[0m has been loaded.`)
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });
          log(`\x1b[38;2;67;170;139m[Slash] \x1b[32m${name}\x1b[0m has been edited.`)
        }
      } else {
        if (localCommand.deleted) {
          log(`\x1b[38;2;67;170;139m[Slash] \x1b[32m${name}\x1b[0m has been skipped.`)
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        log(`\x1b[38;2;67;170;139m[Slash] \x1b[32m${name}\x1b[0m has been registered.`)
      }
    }
  } catch (error) {
    log(`There was an error: \n \n ${error}`)
  }
};