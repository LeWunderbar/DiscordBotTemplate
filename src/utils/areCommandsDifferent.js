const normalizeCommand = (command) => {
  if (command?.toJSON) {
    return command.toJSON();
  }

  if (command?.data?.toJSON) {
    return command.data.toJSON();
  }

  return {
    name: command?.name || '',
    description: command?.description || '',
    options: command?.options || [],
    type: command?.type,
  };
};

module.exports = (existingCommand, localCommand) => {
  const existing = normalizeCommand(existingCommand);
  const local = normalizeCommand(localCommand);

  const existingOptions = existing.options || [];
  const localOptions = local.options || [];

  const sameOptions =
    existingOptions.length === localOptions.length &&
    existingOptions.every((option, index) => {
      const localOption = localOptions[index];
      return (
        option?.name === localOption?.name &&
        option?.description === localOption?.description &&
        option?.type === localOption?.type &&
        option?.required === localOption?.required
      );
    });

  return (
    existing.name !== local.name ||
    existing.description !== local.description ||
    existing.type !== local.type ||
    !sameOptions
  );
};