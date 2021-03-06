import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from './api';
import * as actions from './actions';


import { Button, Card, Container, Dimmer, Flag, Icon, Grid, Header, Loader, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class CountryDetail extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.getDataRequested(api.flights, this.props.match.params.name);
  }

  getWeather = (capital) => (e) => {
    this.props.getDataRequested(api.weather + capital);
  }

  render() {
    const { countries, flights, isLoading, weather } = this.props;
    const i = countries.findIndex(country => country.alpha2Code === this.props.match.params.code);
    const country = countries[i];
    const { capital } = country;

    return (
      <Container>
        <Header dividing={true}>
          <h1>
            <Flag name={country.alpha2Code.toLowerCase()} />{country.name}
            <Link to="/" className="home"><Icon name="home" /></Link>
          </h1>
        </Header>
        { weather.length ?
            <Message icon="thermometer half"
              header={`The Current Temperature is ${weather[0].temp}℃ in ${capital}!`}
              content={`The high for today is ${weather[0].temp_max}℃ and low is ${weather[0].temp_min}℃`}
            /> : ''}
        <Grid columns={4}>
          {flights.map((flight, i) => {
            return (
              <Grid.Column key={i}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      <h3>{flight[1] || 'N/A'}</h3>
                    </Card.Header>
                    <p><strong>Lat:</strong> {flight[5]} <strong>Lng:</strong> {flight[6]}</p>
                    <Button animated='vertical' onClick={this.getWeather(capital)}>
                      <Button.Content hidden>
                        <Icon name='sun' />
                        <Icon name='rain' />
                      </Button.Content>
                      <Button.Content visible>
                        Get Weather
                      </Button.Content>
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            );
          })}
          <Dimmer active={isLoading} inverted>
            <Loader />
          </Dimmer>
          {!flights.length && !isLoading ?
            <Message icon="compass"
              header="Sorry, there are no flights currently in this country's airspace!"
              content="Please try again later or another country."
            /> : ''}
        </Grid>
      </Container>
    )
  };
}
const { array, bool, func, object } = PropTypes;

CountryDetail.propTypes = {
  countries: array,
  flights: array,
  isLoading: bool,
  getDataRequested: func,
  weather: array
};

const mapStateToProps = (state) => {
  return {
    countries: state.dataReducer.countries,
    flights: state.dataReducer.flights,
    isLoading: state.dataReducer.isLoading,
    weather: state.dataReducer.weather
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDataRequested: (url, country) => dispatch(actions.getDataRequested(url, country))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetail);

