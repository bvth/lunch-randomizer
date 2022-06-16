import  { useState, useEffect } from "react";
import { options } from "../rapidapi_options";
import axios from "axios";

export default function Randomizer (props) {
    const [restaurantList, setRestaurantList] = useState([1,2,3,4,5,6,7,8,9]);

    useEffect(() => {
        axios({
            ...options,
            url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
            params: {
                latitude: '60.1667969',
                longitude: '24.9452124',
                limit: '30',
                currency: 'USD',
                distance: '2',
                open_now: 'false',
                lunit: 'km',
                lang: 'en_US'
            },
        }).then(
            res => {
                console.log(res.data.data);
            }
        ).catch( e => {
            console.error(e);
        })
    },[])

    return (
        <span>{restaurantList[Math.round(Math.random()*9)]}</span>
    )
}
