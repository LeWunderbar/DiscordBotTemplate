//////////////////////////
// Imports of Index.js //
/////////////////////////

const eventHandler = require('./handlers/eventHandler');
const log = require("./utils/log")

////////////
// Launch //
////////////

console.clear();
console.log(`
	██╗      ██████╗ ██╗   ██╗    ███╗   ███╗██████╗ ██████╗
	╚██╗     ██╔══██╗╚██╗ ██╔╝    ████╗ ████║╚════██╗╚════██╗
	 ╚██╗    ██████╔╝ ╚████╔╝     ██╔████╔██║ █████╔╝ █████╔╝
	 ██╔╝    ██╔══██╗  ╚██╔╝      ██║╚██╔╝██║██╔═══╝  ╚═══██╗
	██╔╝     ██████╔╝   ██║       ██║ ╚═╝ ██║███████╗██████╔╝
	╚═╝      ╚═════╝    ╚═╝       ╚═╝     ╚═╝╚══════╝╚═════╝                                                
`);
log(`\x1b[38;2;249;65;68m[Launcher] \x1b[32mStarting Bot ...`);

(async () => {
	try {
		eventHandler();
	} catch (error) {
		log(`\x1b[31m[Error] \x1b[32mAn error occurred in launch.js:\n\x1b[0m${err}`)
	}
})();
