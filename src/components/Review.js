import React, { useEffect } from "react";
import { useAuth0 } from '../react-auth0-spa';
import { apiBaseUrl } from '../config';
import Axios from 'axios';


// component to create new review
const Review = () => {
    const { getTokenSilently } = useAuth0();
    const { user } = useAuth0();

    useEffect(() => {

        if (!user) return;
        // mutation params hard-coded for testing
        // these values will need to be retrieved dynamically

        const rating = 5;
        const shipId = 9;
        const description = 'Test review';

        const token = getTokenSilently();


        const rs = `
            mutation ($customerId: Int!, $rating:Int!, $shipId:Int!, $description:String!){
                addReview(customerId:$customerId,rating:$rating,shipId:$shipId,description:$description){
                description
                rating
                id
                customerId
                }
            }
        `;

        (async () => {
            const reviewRes = await Axios({
                url: `${apiBaseUrl}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'post',
                data: {
                    query: rs,
                    variables: {
                        customerId: user.id,
                        rating,
                        shipId,
                        description
                    },
                },
            });
            const data = reviewRes.data.data;
            console.log('data from reviewRes: ', data);
        })();
    }, [user]);

    return (
        <div>Holla</div>
    )
}

export default Review;