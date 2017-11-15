import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { applyMiddleware, bindActionCreators, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Link, Switch, Route } from 'react-router-dom';
import Rx from 'rxjs';

import { Card, Container, Dimmer, Grid, Header, Input, Loader } from 'semantic-ui-react';
import api from './api';
import initialState from './initialState';
import * as actions from './actions';
import { reducer } from './reducer';
import filteredList from './selectors';
import CountryDetail from './single';

const history = createHistory();

const epicMiddleware = createEpicMiddleware(actions.getDataEpic);
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(epicMiddleware)
);

class Countries extends React.Component {
  constructor(props, context){
    super(props, context);
    this.onSearch$ = new Rx.Subject();
  }

  componentDidMount() {
    const { getDataRequested, getFilteredList } = this.props.actions;
    getDataRequested(api.countries);

    this.subscription = this.onSearch$
      .debounceTime(300)
      .subscribe(debounced => getFilteredList(debounced));
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
        <Header dividing={true}>
          <h1>&#x1F680; Aerial Heat</h1>
        </Header>
        
        <Grid columns={4}>
          <Grid.Column className="search">
            <Card>
              <Input icon="search" placeholder="Search..."
                onChange={this.searchQuery} />  
            </Card>
          </Grid.Column>
          {countries.map((country, i) => {
            return (
              <Grid.Column key={i}>
                <Card>
                  <Card.Content>
                    <Link to={`/${country.alpha2Code}/${country.name}`}>
                      {country.name}, {country.alpha2Code}
                    </Link>
                  </Card.Content>
                </Card>
              </Grid.Column>
            );
          })}
          <Dimmer active={isLoading} inverted>
            <Loader />
          </Dimmer>
        </Grid>   
     </Container>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    countries: filteredList(state),
    isLoading: state.dataReducer.isLoading,
    filter: state.filterReducer.filter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
};

Countries = connect(mapStateToProps, mapDispatchToProps)(Countries);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Countries} />
        <Route path="/:code/:name" component={CountryDetail} />
        <Route path="*" component={CountryDetail} />
      </Switch>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);

