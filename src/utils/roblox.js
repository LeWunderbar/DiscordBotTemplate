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
        log(err)
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
        log("ERROR: An unknown issue has occurred.")
        return undefined
    }
}

async function getUsernameFromUserId(userId) {
    try {
        const response = await axios.get(`https://users.roblox.com/v1/users/${userId}`);
        return response.data.name;
    } catch (err) {
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
        return undefined;
    }
}

async function getUserGroupRank(userId, groupId) {
    try {
        const response = await axios.get(`https://groups.roblox.com/v1/users/${userId}/groups/roles`);
        
        if (response.status === 200) {
            const groups = response.data.data;
            const groupInfo = groups.find(group => group.group.id === +groupId);

            if (groupInfo) {
                const { role } = groupInfo;
                return role.name
            } else {
                return null;
            }
        }
    } catch (error) {
        if (error.response) {
            log(`Error fetching user group rank: ${error.message} - ${error.response.status}: ${error.response.data}`);
        } else if (error.request) {
            log(`Error fetching user group rank: No response received - ${error.message}`);
        } else {
            log(`Error fetching user group rank: ${error.message}`);
        }
    }
}

async function checkGamePassOwnership(userId, gamePassId) {
    try {
        const response = await axios.get(`https://inventory.roblox.com/v1/users/${userId}/items/GamePass/${gamePassId}`);
        return response.data.data && response.data.data.length > 0;
    } catch (error) {
        if (error.response) {
            log(`Failed to check Game Pass ownership. Status: ${error.response.status}`);
        } else {
            log("Error fetching Game Pass ownership:", error.message);
        }
        return false;
    }
}

async function getGamePassInfo(gamePassId) {
    try {
        const response = await axios.get(`https://apis.roblox.com/game-passes/v1/game-passes/${gamePassId}/product-info`);
        const gamePassData = response.data;
        return {
            id: gamePassData.TargetId,
            name: gamePassData.Name,
            price: gamePassData.PriceInRobux,
            description: gamePassData.Description,
            created: gamePassData.Created,
            updated: gamePassData.Updated,
            sales: gamePassData.Sales
        };
    } catch (error) {
        return undefined;
    }
}

async function getGamePassThumbnail(gamePassId, isCircular = false, size = '150x150', format = 'Png') {
    try {
        const response = await axios.get(`https://thumbnails.roblox.com/v1/game-passes`, {
            params: {
                gamePassIds: gamePassId,
                size: size,
                format: format,
                isCircular: isCircular
            }
        });
        return response.data.data.map(thumbnail => ({
            gamePassId: thumbnail.targetId,
            thumbnailUrl: thumbnail.imageUrl,
            state: thumbnail.state // Returns "Completed" if successful, or "Pending"/"Error" otherwise
        }));
    } catch (error) {
        return null;
    }
}

async function getAvatarThumbnail(userid, isCircular = false, size = '150x150', format = 'Png') {
    try {
        const response = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot`, {
            params: {
                userIds: userid,
                size: size,
                format: format,
                isCircular: isCircular
            }
        });
        return response.data.data.map(thumbnail => ({
            userId: thumbnail.targetId,
            thumbnailUrl: thumbnail.imageUrl,
            state: thumbnail.state // Returns "Completed" if successful, or "Pending"/"Error" otherwise
        }));
    } catch (error) {
        return null;
    }
}


module.exports = {
    sendMessage,

    getUsernameFromUserId,
    getUserIdFromUsername,
    getAvatarThumbnail,
    
    getUserGroupRank,

    checkGamePassOwnership,
    getGamePassInfo,
    getGamePassThumbnail,

    getOrderedDatastoreEntry,

    getKeys,
    getEntry,
    getDatastore
};
