"use strict";
class ConsoleLogger {
    debug(message) {
        console.info(`[DEBUG] ${message}`);
    }
    info(message) {
        console.info(message);
    }
    warning(message) {
        console.warn(message);
    }
    error(message) {
        console.error(message);
    }
}
class ConsoleLogger2 {
    clear() {
        console.clear();
    }
    debug(message) {
        console.info(`[DEBUG] ${message}`);
    }
    info(message) {
        console.info(message);
    }
    warning(message) {
        console.warn(message);
    }
    error(message) {
        console.error(message);
    }
}
const cl = new ConsoleLogger();
cl.debug("Bug 1");
cl.info("Info 1");
cl.warning("Warning 1");
cl.error("Error 1");
const cl2 = new ConsoleLogger2();
cl2.clear();
cl2.debug("Bug 2");
cl2.info("Info 2");
cl2.warning("Warning 2");
cl2.error("Error 2");
