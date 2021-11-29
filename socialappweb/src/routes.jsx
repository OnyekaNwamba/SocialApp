import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { sessionService } from 'redux-react-session';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Main } from "./pages/landing/main/main";
import { SignUpMainPage } from "./pages/signup/main/main";
import { Api } from "./commons/api";
import { ProfileMainPage } from "./pages/profile/main/main";
import { LoginMainPage } from "./pages/login/main/main";
import { DiscoverMainPage } from "./pages/discover/main/main";

const store = createStore(() => {});

// Singletons
const api = new Api();

// Router
// ----------------------------------------------------------------------------
export const routes = [
  {
    path: '/discover',
    exact: false,
    pageName: 'DiscoverMainPage',
    content: (props) => <DiscoverMainPage {...props} />
  },
  {
    path: '/profile',
    exact: false,
    pageName: 'ProfileMainPage',
    content: (props) => <ProfileMainPage {...props} />
  },
  {
    path: '/login',
    exact: false,
    pageName: 'LoginPage',
    content: (props) => <LoginMainPage {...props} />
  },
  {
    path: '/sign-up',
    exact: false,
    pageName: 'LoginPage',
    content: (props) => <SignUpMainPage {...props} />
  },
  {
    path: '/',
    exact: false,
    pageName: 'MainPage',
    content: (props) => <Main {...props} />
  }
];

export const redirects = [];

export const RouterBuilder = (routes) => {

  if (routes.some(s => s.pageName === undefined)) {
    throw new Error("pageName is required field");
  }

  return (
    <Provider store={store}>
      <Switch>
        <Redirect from="/:url*(/+)" to={window.location.pathname.slice(0, -1)}/>
        {redirects.map((redirect, index) => (
          <Redirect
            key={index}
            from={redirect.from}
            to={redirect.to}
            exact={redirect.exact}/>
        ))}
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={props => route.content({ ...props, api, sessionService, store, ...{ pageName: route.pageName } })}
          />
        ))}
      </Switch>
    </Provider>
  );
};

const Router = () => RouterBuilder(routes);
export default Router;
