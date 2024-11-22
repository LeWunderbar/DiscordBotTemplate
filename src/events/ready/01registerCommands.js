const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");
const { config } = require("../../configurator");
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalInteractions = require('../../utils/getLocalInteractions');
const log = require("../../utils/log");

module.exports = async (client) => {
	try {
		const localSlashCommands = getLocalInteractions("slashCommands");
		const localUserContextMenus = getLocalInteractions("userContextMenus");
		const applicationCommands = await getApplicationCommands(client);

		// Register Slash Commands
		for (const localCommand of localSlashCommands) {
			const { name, description, options } = localCommand;
			const existingCommand = await applicationCommands.cache.find(
				(cmd) => cmd.name === name
			);

			if (existingCommand) {
				if (localCommand.deleted) {
					await applicationCommands.delete(existingCommand.id);
					log(`\x1b[38;2;248;150;30m[Slash] \x1b[32m${name}\x1b[0m has been deleted.`);
					continue;
				} else {
					log(`\x1b[38;2;248;150;30m[Slash] \x1b[32m${name}\x1b[0m has been loaded.`);
				}

				if (areCommandsDifferent(existingCommand, localCommand)) {
					await applicationCommands.edit(existingCommand.id, {
						description,
						options,
					});
					log(`\x1b[38;2;248;150;30m[Slash] \x1b[32m${name}\x1b[0m has been edited.`);
				}
			} else {
				if (localCommand.deleted) {
					log(`\x1b[38;2;248;150;30m[Slash] \x1b[32m${name}\x1b[0m has been skipped.`);
					continue;
				}

				await applicationCommands.create({
				name,
				description,
				options,
				});
				log(`\x1b[38;2;248;150;30m[Slash] \x1b[32m${name}\x1b[0m has been registered.`);
			}
		}

		// Register User Context Menus
		for (const localMenu of localUserContextMenus) {
			const name = localMenu.data.name

			const existingMenu = await applicationCommands.cache.find(
				(cmd) => cmd.name === name
			);

			if (existingMenu) {
				if (localMenu.deleted) {
					await applicationCommands.delete(existingMenu.id);
					log(`\x1b[38;2;249;199;79m[ContextMenu] \x1b[32m${name}\x1b[0m has been deleted.`);
					continue;
				} else {
					log(`\x1b[38;2;249;199;79m[ContextMenu] \x1b[32m${name}\x1b[0m has been loaded.`);
				}
			} else {
				if (localMenu.deleted) {
					log(`\x1b[38;2;249;199;79m[ContextMenu] \x1b[32m${name}\x1b[0m has been skipped.`);
					continue;
				}

				await applicationCommands.create({
					name,
					type: ApplicationCommandType.User
				});
				log(`\x1b[38;2;249;199;79m[ContextMenu] \x1b[32m${name}\x1b[0m has been registered.`);
			}
		}
	} catch (error) {
		log(`\x1b[31m[Error] \x1b[32mAn error occurred while registering commands:\n\x1b[0m${error}`);
	}
};
