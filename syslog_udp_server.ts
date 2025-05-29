// syslog_udp_server.ts
import { parseArgs } from "jsr:@std/cli/parse-args";
const args = parseArgs(Deno.args);
// user-args 
const PORT = Number(args.port) || 514;
const LOG_DIR = args.log || "./log";
const consolelog: Boolean = args.console==="false"?false:true;
const onlysave = args._;
// create log folder
await Deno.mkdir(LOG_DIR, { recursive: false }).catch((err)=>{});

const socket = Deno.listenDatagram({
	port: PORT,
	transport: "udp",
	hostname: "0.0.0.0",
});

console.log(`✅ Syslog UDP server is listening on port ${PORT}...`);

function parsePri(msg: string): number | null {
	const priMatch = msg.match(/^<(\d+)>/);
	if (!priMatch) return null;
	return parseInt(priMatch[1]);
}

for await (const [msg, addr] of socket) {
	const message = new TextDecoder().decode(msg).trim();
	const now = new Date();
	const dateStr = now.toISOString().split("T")[0];
	//const timeStr = now.toTimeString().split(" ")[0];
	const logLine = `${message}\n`;
	const Pri = parsePri(message)
	const logFilePath = `${LOG_DIR}/${dateStr}.txt`;
	if(onlysave.length === 0 || (onlysave.length !== 0 && Pri !== null && onlysave.includes(Pri) === true) || onlysave.length !== 0 && Pri === null){
		await Deno.writeTextFile(logFilePath, logLine, { append: true });
		if(consolelog === true){
			if ("hostname" in addr) {
				console.log(`📥 ${addr.hostname} ➜ ${message}`);
			} else {
				console.log(`📥 [unix socket] ➜ ${message}`);
			}
		} 
	}
}
