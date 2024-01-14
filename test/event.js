// const event = "Merge Request Hook";
// const event = "Issue Hook";
const event = "Tag Push Hook";
const { HEADER_EVENTS_TO_KEY, PROP_TO_KEY } = require("../src/v.js");
console.log(event);
let fName = HEADER_EVENTS_TO_KEY[event];
const templateName = process.env.TEMPLATE_NAME || "default";
const template = require(`../src/templates/${templateName}`);
const data = require("./events.js").tag;
if (!fName) {
  for (let k in PROP_TO_KEY) {
    if (data[k]) {
      fName = PROP_TO_KEY[k];
      break;
    }
  }
}
if (!fName) {
  return res.status(400).send("Bad Request");
}

let msgOption = template[fName]?.(data) || template._?.(data);
console.log(msgOption);
