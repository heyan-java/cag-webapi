// server.ts
import express from "express";
import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import { Request, Response } from "express";

// Create Express server
const app = express();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());
app.get("/", (req: Request, res: Response) => {
  res.json({
    msg: "Hello"
  });
});

app.get('/e-dunhuang/grapInBrowser', (req: Request, res: Response) => {
  res.json({
    msg: "Hello"
  });
});
app.post('/e-dunhuang/grapInBrowser', (req: Request, res: Response) => {
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
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
