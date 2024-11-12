const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (interactionTypeFolderName, exceptions = []) => {
    const interactionCategories = getAllFiles(
        path.join(__dirname, '..', `interactions/${interactionTypeFolderName}`),
        true
    );

    return interactionCategories.flatMap((category) => {
        const interactionFiles = getAllFiles(category);

        return interactionFiles
            .map((file) => require(file))
            .filter((interaction) => !exceptions.includes(interaction.name));
    });
};
