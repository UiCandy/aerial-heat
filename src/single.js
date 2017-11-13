import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from './actions';


import { Button, Card, Container, Flag, Header } from 'semantic-ui-react';


class CountryDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { countries } = this.props;
        const i = countries.findIndex(country => country.alpha2Code === this.props.match.params.code);
        const country = countries[i];
        
        return(
            <Container>
                <Header dividing={true}>
                    <Header.Content>
                        <h1><Flag name={country.alpha2Code.toLowerCase()} />{country.name}</h1>
                    </Header.Content>
                </Header>
            </Container>
        )
    };
}
const { array, func, object } = PropTypes;

CountryDetail.propTypes = {
    countries: array,
    flights: array,
    fetchData: func,
    saveFlights: func,
    saveWeather: func,
    match: object
};

export default connect((state) => state, { actions })(CountryDetail);

