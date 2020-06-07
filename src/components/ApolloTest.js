import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ShipItem from './AT_ShipItem';

const SHIPS_QUERY = gql`
    {
        ships{
            id
            name
            price
        }
    }
`;

export default function ApolloTest({ }) {
    return (
        <div>
            <h1 >Spacecraft </h1>
            {/* <MissionKey /> */}
            <Query query={SHIPS_QUERY}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <h4>Loading...</h4>
                        if (error) console.log(error);

                        return (
                            <>
                                {
                                    data.ships.map((ship) => (
                                        <ShipItem key={ship.id} ship={ship} />
                                    ))
                                }
                            </>
                        )
                    }
                }
            </Query>
        </div>
    )
}
