# Universal React Redux Boilerplate
Oddly enough, we're not using webpack's hot loading feature. It adds an unnecessary amount of noise to our code, and the tools built around it is fragile.

Another important point: We're not doing 100% server rendering. That is, anything that requires database or api calls within the server won't be rendered on the server (initial store will always be empty). Instead, the job is forwarded to the client (e.g. `componentDidMount`) to fetch and update state. If your requirement doesn't include friendly SEO's, this removes some overhead logic. It's also better in terms of UX since the initial page load will be much faster.


## Tips n tricks
* Whenever you want to use `require`, and the target module exports as `export default..`, use `require('module').default`
* You can't use `import` or `export` at the top level. That is, they can't be conditionally run
  * Stick to `import` or `export` if you can.
* Whenever you define globals on node with `global.__SOMETHING__`, you don't need the `global.` to reference it
* `mapStateToProps` subscribes to store; `mapDispatchToProps` doesn't (no render updates)



## Usage

### Commands
1. **Development:**
  * `npm run dev` doesn't restart server automatically (use this if working on client side as it's much faster, since only webpack is rebuilding)
  * `npm run devs` restarts server automatically
2. **Build:** `npm run build`
3. **Production:** `npm run start`



## Packages

### Essentials
* `babel-cli` - provides CLI for building/development
* `babel-core`, `babe-loader`, `babel-preset-{es2015,react,stage-2}` - for auto-transpiling
* `nodemon` - restart server after a change
* `webpack`, `webpack-dev-middleware` - so we don't have to use webpack-dev-server
* `express`
* `react`, `react-dom`
* `react-router`
* `redux`, `redux-thunk`
* `redux-devtools`, `redux-devtools-{dock-monitor,log-monitor}`

### Goodies
* `axios` - http requests using promises
* `morgan` - http request logger


## Under the hood
### Client
* `<Root>` acts as the root component wrapper. It simply requires a store and a `<Router>` child. This makes it easy to render on both client and server. Also, this makes it possible to only render `<DevTools>` if in development mode.
