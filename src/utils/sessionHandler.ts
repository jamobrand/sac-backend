import UssdMenu from "ussd-builder"

let sessions:any = {}

let menu = new UssdMenu()
menu.sessionConfig({
  start: (sessionId:string, callback: Function) => {
    // initialize current session if it doesn't exist
    // this is called by menu.run()
    if (!(sessionId in sessions)) sessions[sessionId] = {};
    callback();
  },
  end: (sessionId:string, callback: Function) => {
    // clear current session
    // this is called by menu.end()
    delete sessions[sessionId];
    callback();
  },
  set: (sessionId:string, key:string, value:any, callback: Function) => {
    // store key-value pair in current session
    sessions[sessionId][key] = value;
    callback();
  },
  get: (sessionId:string, key:string, callback: Function) => {
    // retrieve value by key in current session
    let value = sessions[sessionId][key];
    callback(null, value);
  }
});

module.exports = menu;