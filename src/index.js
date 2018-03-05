import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { Route } from "react-router-dom";
import rootReducer from "./reducers";
import { Home, Profile } from "./components/pages";
// import './style/main.scss';

const history = createHistory();

const middleware = composeWithDevTools(
  applyMiddleware(routerMiddleware(history), thunkMiddleware)
);

const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="flex flex-site flex-col">
        <Route path="/">
          <div>
            <div className="innermax">
              <Route exact path="/" component={Home} />
              <Route path="/profile/:id" component={Profile} />
            </div>
          </div>
        </Route>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
