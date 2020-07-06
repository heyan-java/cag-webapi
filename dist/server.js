"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const errorhandler_1 = __importDefault(require("errorhandler"));
// Create Express server
const app = express_1.default();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorhandler_1.default());
app.get("/", (req, res) => {
    res.json({
        msg: "Hello"
    });
});
app.get('/e-dunhuang/grapInBrowser', (req, res) => {
    res.json({
        msg: "Hello"
    });
});
app.post('/e-dunhuang/grapInBrowser', (req, res) => {
    console.log('post of /e-dunhuang/grapInBrowser');
    let data = req.body;
    res.json({
        msg: data
    });
});
/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    console.log("  App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
//# sourceMappingURL=server.js.map