const axios = require("axios");
const log = require("./log");
const { config, development } = require("../configurator");
require('dotenv').config({
    path: development ? '.envDev' : '.env'
});

async function sendMessage(message, topic) {
    try {
        const response = await axios.post(
            `https://apis.roblox.com/messaging-service/v1/universes/${config.UNIVERSE}/topics/${topic}`,
            { message },
            {
                headers: {
                    'x-api-key': process.env.ROBLOXAPI,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (response.status === 200) return 200;
    } catch (err) {
        log(err.response?.data || err.message);
        if (err.response) {
            switch (err.response.status) {
                case 401:
                    return "ERROR: API key not valid for operation, user does not have authorization";
                case 403:
                    return "ERROR: Publish is not allowed on universe.";
                case 500:
                    return "ERROR: Server internal error / Unknown error.";
                case 400:
                    if (err.response.data === "requestMessage cannot be longer than 1024 characters. (Parameter 'requestMessage')")
                        return "ERROR: The request message cannot be longer than 1024 characters.";
                    break;
            }
        }
        return "ERROR: An unknown issue has occurred.";
    }
}

async function getUsernameFromUserId(userId) {
    try {
        const response = await axios.get(`https://users.roblox.com/v1/users/${userId}`);
        return response.data.name;
    } catch (err) {
        log(`Error fetching username for user ID ${userId}: ${err.message}`);
        return undefined;
    }
}

async function getUserIdFromUsername(username) {
    try {
        const response = await axios.post(`https://users.roblox.com/v1/usernames/users`, {
            "usernames": [username],
            "excludeBannedUsers": true
        });
        return response.data.data[0].id;
    } catch (err) {
        log(`Error fetching user ID for username ${username}: ${err.message}`);
        return undefined;
    }
}

async function getOrderedDatastoreEntry(orderedDataStore, scope, orderBy, maxPageSize) {
    try {
        const response = await axios.get(`https://apis.roblox.com/ordered-data-stores/v1/universes/${config.UNIVERSE}/orderedDataStores/${orderedDataStore}/scopes/${scope}/entries`, {
            params: {
                "max_page_size": maxPageSize,
                "order_by": orderBy,
            },
            headers: {
                "x-api-key": process.env.ROBLOXAPI
            }
        });
        return response.data;
    } catch (err) {
        log(`Error fetching ordered datastore entry: ${err.message}`);
        return undefined;
    }
}

async function getKeys(datastoreName, cursor) {
    try {
        const response = await axios.get(`https://apis.roblox.com/datastores/v1/universes/${config.UNIVERSE}/standard-datastores/datastore/entries`, {
            params: {
                "datastoreName": datastoreName,
                "cursor": cursor
            },
            headers: {
                "x-api-key": process.env.ROBLOXAPI
            }
        });
        return response.data;
    } catch (err) {
        log(`Error fetching keys: ${err.message}`);
        return null;
    }
}

async function getEntry(datastoreName, key, cursor) {
    try {
        const response = await axios.get(`https://apis.roblox.com/datastores/v1/universes/${config.UNIVERSE}/standard-datastores/datastore/entries/entry`, {
            params: {
                "datastoreName": datastoreName,
                "entryKey": key,
                "cursor": cursor
            },
            headers: {
                "x-api-key": process.env.ROBLOXAPI
            }
        });
        return response.data;
    } catch (err) {
        log(`Error fetching entry: ${err.message}`);
        return undefined;
    }
}

async function getDatastore(cursor, limit, prefix) {
    try {
        const response = await axios.get(`https://apis.roblox.com/datastores/v1/universes/${config.UNIVERSE}/standard-datastores`, {
            params: {
                "cursor": cursor,
                "limit": limit,
                "prefix": prefix
            },
            headers: {
                "x-api-key": process.env.ROBLOXAPI
            }
        });
        return response.data;
    } catch (err) {
        log(`Error fetching datastore: ${err.message}`);
        return null;
    }
}

async function getUserGroupRank(userId, groupId) {
    try {
        const response = await axios.get(`https://groups.roblox.com/v1/users/${userId}/groups/roles`);
        
        if (response.status === 200) {
            const groups = response.data.data;

            const groupInfo = groups.find(group => group.group.id === groupId);

            if (groupInfo) {
                const { role } = groupInfo;
                return {
                    rankName: role.name,
                };
            } else {
                log.log(`User is not a member of group ${groupId}`);
                return null;
            }
        }
    } catch (error) {
        log("Error fetching user group rank:", error);
    }
}

module.exports = {
    sendMessage,

    getUsernameFromUserId,
    getUserIdFromUsername,
    
    getUserGroupRank,

    getOrderedDatastoreEntry,

    getKeys,
    getEntry,
    getDatastore
};
