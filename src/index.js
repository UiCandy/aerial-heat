import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { connect, Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Link, Switch, Route } from 'react-router-dom';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import { Card, Container, Grid, Input } from 'semantic-ui-react';
import * as actions from './actions';
import { reducer } from './reducer';
import api from './api';
import CountryDetail from './single';
import Rx from 'rxjs';

const history = createHistory();

const epicMiddleware = createEpicMiddleware(actions.getDataEpic);
const store = createStore(
  reducer,
  { isLoading: false, isError: false, countries: [], flights: [] },
  applyMiddleware(epicMiddleware)
);

class Countries extends React.Component {
  constructor(props, context){
    super(props, context);
    this.onSearch$ = new Rx.Subject();
  }

  componentDidMount() {
    const { getDataRequested } = this.props;
    getDataRequested();

    this.subscription = this.onSearch$
      .debounceTime(300)
      .subscribe(debounced => console.log(debounced));
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  searchQuery = (e) => {
    this.onSearch$.next(e.target.value);
  };

  render() {
    const { isLoading, isError, countries } = this.props;

    return (
      <Container>
        <Input icon="search" placeholder="Search..."
             onChange={this.searchQuery}
        />
        <Grid columns={4}>
          {countries.map((country, i) => {
            return (
            <Grid.Column key={i}>
              <Card>
                <Card.Content>
                  <Link to={`${country.alpha2Code}/${country.name}`}>
                    {country.name}, {country.alpha2Code}
                  </Link>
                </Card.Content>
              </Card>
            </Grid.Column>
            );
          })}
        </Grid>   
     </Container>

    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDataRequested: () => dispatch(actions.getDataRequested(api.countries))
  }
};

Countries = connect(mapStateToProps, mapDispatchToProps)(Countries);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Countries} />
        <Route path="/:code/:name" component={CountryDetail} />
      </Switch>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);

