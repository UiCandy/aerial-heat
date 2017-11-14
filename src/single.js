import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from './api';
import * as actions from './actions';


import { Button, Card, Container, Dimmer, Flag, Icon, Grid, Header, Loader } from 'semantic-ui-react';


class CountryDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.getDataRequested(api.flights);
    }

    getWeather = () => {
        this.props.getDataRequested(api.weather);
    }

    render() {
        const { countries, flights, isLoading } = this.props;
        const i = countries.findIndex(country => country.alpha2Code === this.props.match.params.code);
        const country = countries[i];
        
        return(
            <Container>
                <Header dividing={true}>
                    <h1><Flag name={country.alpha2Code.toLowerCase()} />{country.name}</h1>
                </Header>
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
                                        <Button animated='vertical' onClick={this.getWeather}>
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
        getDataRequested: (url) => dispatch(actions.getDataRequested(url))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetail);

