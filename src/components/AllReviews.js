import React, { useEffect } from "react";
import { apiBaseUrl } from '../config';
import Axios from 'axios';


// component to create new review
const AllReviews = () => {

    useEffect(() => {


        // mutation params hard-coded for testing
        // these values will need to be retrieved dynamically

        const shipId = 9;

        const as = `
        {
            ship(shipId:9){
              reviews{
                id
                description
              }
            }
          }
        `;
        (async () => {
            const allRevRes = await Axios({
                url: `${apiBaseUrl}`,
                method: 'post',
                data: {
                    query: as,
                    variables: {
                        shipId,
                    },
                },
            });
            const data = allRevRes.data.data;
            console.log('data from reviewRes: ', data);
        })();
    }, [])
    return (
        <div>holla</div>
    )
}

export default AllReviews;