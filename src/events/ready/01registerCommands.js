const { ApplicationCommandType } = require('discord.js');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalInteractions = require('../../utils/getLocalInteractions');
const log = require('../../utils/log');

module.exports = async (client) => {
  try {
    const localSlashCommands = getLocalInteractions('slashCommands');
    const localUserContextMenus = getLocalInteractions('userContextMenus');
    const applicationCommands = await getApplicationCommands(client);

    for (const localCommand of localSlashCommands) {
      const payload = localCommand.data?.toJSON?.() || {
        name: localCommand.name,
        description: localCommand.description || 'No description provided',
        options: localCommand.options || [],
      };

      const { name, description, options } = payload;
      const existingCommand = applicationCommands.cache.find((cmd) => cmd.name === name);

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          log(`\x1b[38;2;248;150;30m[Slash] \x1b[32m${name}\x1b[0m has been deleted.`);
          continue;
        }

        log(`\x1b[38;2;248;150;30m[Slash] \x1b[32m${name}\x1b[0m has been loaded.`);

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, { description, options });
          log(`\x1b[38;2;248;150;30m[Slash] \x1b[32m${name}\x1b[0m has been edited.`);
        }
      } else {
        if (localCommand.deleted) {
          log(`\x1b[38;2;248;150;30m[Slash] \x1b[32m${name}\x1b[0m has been skipped.`);
          continue;
        }

        await applicationCommands.create({ name, description, options });
        log(`\x1b[38;2;248;150;30m[Slash] \x1b[32m${name}\x1b[0m has been registered.`);
      }
    }

    for (const localMenu of localUserContextMenus) {
      const payload = localMenu.data?.toJSON?.() || {
        name: localMenu.name,
        type: ApplicationCommandType.User,
      };
      const name = payload.name;
      const existingMenu = applicationCommands.cache.find((cmd) => cmd.name === name);

      if (existingMenu) {
        if (localMenu.deleted) {
          await applicationCommands.delete(existingMenu.id);
          log(`\x1b[38;2;249;199;79m[ContextMenu] \x1b[32m${name}\x1b[0m has been deleted.`);
          continue;
        }

        log(`\x1b[38;2;249;199;79m[ContextMenu] \x1b[32m${name}\x1b[0m has been loaded.`);
      } else {
        if (localMenu.deleted) {
          log(`\x1b[38;2;249;199;79m[ContextMenu] \x1b[32m${name}\x1b[0m has been skipped.`);
          continue;
        }

        await applicationCommands.create({ name, type: payload.type || ApplicationCommandType.User });
        log(`\x1b[38;2;249;199;79m[ContextMenu] \x1b[32m${name}\x1b[0m has been registered.`);
      }
    }
  } catch (error) {
    log(`\x1b[31m[Error] \x1b[32mAn error occurred while registering commands:\n\x1b[0m${error.stack || error}`);
  }
};
