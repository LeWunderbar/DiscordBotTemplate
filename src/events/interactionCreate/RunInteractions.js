const { config } = require("../../configurator");
const getLocalInteractions = require('../../utils/getLocalInteractions');
const log = require("../../utils/log");

module.exports = async (client, interaction) => {
	if (interaction.isChatInputCommand()) {
		slashInteraction(interaction, client);
	} else if (interaction.isUserContextMenuCommand()) {
		contextMenuInteraction(interaction, client);
	} else if (interaction.isButton()) {
		buttonInteraction(interaction, client);
	} else if (interaction.isStringSelectMenu() || interaction.isUserSelectMenu() || interaction.isRoleSelectMenu() || interaction.isMentionableSelectMenu() || interaction.isChannelSelectMenu()) {
		selectMenuInteraction(interaction, client);
	}
};

// Slash Commands
async function slashInteraction(interaction, client) { 
	const localCommands = getLocalInteractions("slashCommands");
	try {
		const commandObject = localCommands.find(
			(cmd) => cmd.name === interaction.commandName
		);
		if (!commandObject) return;

		if (commandObject.devOnly && !config.DEVS.includes(interaction.member.id)) {
			return interaction.reply({
				content: 'Only developers are allowed to run this command.',
				ephemeral: true,
			});
		}

		if (commandObject.testOnly && interaction.guild.id !== config.TEST_SERVER) {
			return interaction.reply({
				content: 'This command cannot be run here.',
				ephemeral: true,
			});
		}

		if (commandObject.permissionsRequired?.length) {
			for (const permission of commandObject.permissionsRequired) {
				if (!interaction.member.permissions.has(permission)) {
					return interaction.reply({
						content: 'Not enough permissions.',
						ephemeral: true,
					});
				}
			}
		}

		if (commandObject.botPermissions?.length) {
			const bot = interaction.guild.members.me;
			for (const permission of commandObject.botPermissions) {
				if (!bot.permissions.has(permission)) {
					return interaction.reply({
						content: "I don't have enough permissions.",
						ephemeral: true,
					});
				}
			}
		}

		await commandObject.callback(client, interaction);
	} catch (error) {
		log(`\x1b[31m[Error] \x1b[32mAn error occurred while handling Slash Command:\n\x1b[0m${error}`);
		interaction.reply({
			content: 'An error occurred while handling the Slash Command.',
			ephemeral: true,
		});
	}
}

// Buttons
async function buttonInteraction(interaction, client) {
	const buttonId = interaction.customId;
	const localButtons = getLocalInteractions("buttons");

	try {
		const buttonHandler = localButtons.find((cmd) => cmd.buttonId === buttonId);
		if (!buttonHandler) return;

		if (buttonHandler.devOnly && !config.DEVS.includes(interaction.member.id)) {
			return interaction.reply({
				content: 'Only developers are allowed to press this button.',
				ephemeral: true,
			});
		}

		if (buttonHandler.testOnly && interaction.guild.id !== config.TEST_SERVER) {
			return interaction.reply({
				content: 'This button cannot be pressed here.',
				ephemeral: true,
			});
		}

		if (buttonHandler.permissionsRequired?.length) {
			for (const permission of buttonHandler.permissionsRequired) {
				if (!interaction.member.permissions.has(permission)) {
					return interaction.reply({
						content: 'Not enough permissions.',
						ephemeral: true,
					});
				}
			}
		}

		if (buttonHandler.botPermissions?.length) {
			const bot = interaction.guild.members.me;
			for (const permission of buttonHandler.botPermissions) {
				if (!bot.permissions.has(permission)) {
					return interaction.reply({
						content: "I don't have enough permissions.",
						ephemeral: true,
					});
				}
			}
		}

		await buttonHandler.callback(client, interaction);
	} catch (error) {
		log(`\x1b[31m[Error] \x1b[32mAn error occurred while handling button:\n\x1b[0m${error}`);
		interaction.reply({
			content: 'An error occurred while handling the button interaction.',
			ephemeral: true,
		});
	}
}

// Select Menus
async function selectMenuInteraction(interaction, client) {
	const selectMenuId = interaction.customId;
	const localSelectMenus = getLocalInteractions("selectMenus");

	try {
		const selectMenuHandler = localSelectMenus.find((cmd) => cmd.selectMenuId === selectMenuId);
		if (!selectMenuHandler) return;

		if (selectMenuHandler.devOnly && !config.DEVS.includes(interaction.member.id)) {
			return interaction.reply({
				content: 'Only developers are allowed to select this option.',
				ephemeral: true,
			});
		}

		if (selectMenuHandler.testOnly && interaction.guild.id !== config.TEST_SERVER) {
			return interaction.reply({
				content: 'This select menu cannot be used here.',
				ephemeral: true,
			});
		}

		if (selectMenuHandler.permissionsRequired?.length) {
			for (const permission of selectMenuHandler.permissionsRequired) {
				if (!interaction.member.permissions.has(permission)) {
					return interaction.reply({
						content: 'Not enough permissions.',
						ephemeral: true,
					});
				}
			}
		}

		if (selectMenuHandler.botPermissions?.length) {
			const bot = interaction.guild.members.me;
			for (const permission of selectMenuHandler.botPermissions) {
				if (!bot.permissions.has(permission)) {
					return interaction.reply({
						content: "I don't have enough permissions.",
						ephemeral: true,
					});
				}
			}
		}

		await selectMenuHandler.callback(client, interaction);
	} catch (error) {
		log(`\x1b[31m[Error] \x1b[32mAn error occurred while handling select menu:\n\x1b[0m${error}`);
		interaction.reply({
			content: 'An error occurred while handling the select menu interaction.',
			ephemeral: true,
		});
	}
}

// User Context Menus
async function contextMenuInteraction(interaction, client) {
	const userContextMenuId = interaction.commandName;
	const localContextMenus = getLocalInteractions("userContextMenus");

	try {
		const contextMenuHandler = localContextMenus.find((cmd) => cmd.data.name === userContextMenuId);
		if (!contextMenuHandler) return;

		if (contextMenuHandler.devOnly && !config.DEVS.includes(interaction.member.id)) {
			return interaction.reply({
				content: 'Only developers are allowed to use this context menu.',
				ephemeral: true,
			});
		}

		if (contextMenuHandler.testOnly && interaction.guild.id !== config.TEST_SERVER) {
			return interaction.reply({
				content: 'This context menu cannot be used here.',
				ephemeral: true,
			});
		}

		if (contextMenuHandler.permissionsRequired?.length) {
			for (const permission of contextMenuHandler.permissionsRequired) {
				if (!interaction.member.permissions.has(permission)) {
					return interaction.reply({
						content: 'Not enough permissions.',
						ephemeral: true,
					});
				}
			}
		}

		if (contextMenuHandler.botPermissions?.length) {
			const bot = interaction.guild.members.me;
			for (const permission of contextMenuHandler.botPermissions) {
				if (!bot.permissions.has(permission)) {
					return interaction.reply({
						content: "I don't have enough permissions.",
						ephemeral: true,
					});
				}
			}
		}

		await contextMenuHandler.callback(client, interaction);
	} catch (error) {
		log(`\x1b[31m[Error] \x1b[32mAn error occurred while handling user context menu:\n\x1b[0m${error}`);
		interaction.reply({
			content: 'An error occurred while handling the user context menu interaction.',
			ephemeral: true,
		});
	}
}
