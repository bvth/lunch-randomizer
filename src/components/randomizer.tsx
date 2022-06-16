import  React, { useState, useEffect } from "react";
import { options } from "../rapidapi_options";
import axios from "axios";

export default function Randomizer () {
    const [restaurantList, setRestaurantList] = useState<any[]>([]);

    useEffect(() => {
        axios({
            ...options,
            url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
            params: {
                latitude: '60.1667969',
                longitude: '24.9452124',
                limit: '30',
                distance: '2',
                open_now: 'false',
                lunit: 'km',
                lang: 'en_US'
            },
        }).then(
            res => {
                setRestaurantList(res.data.data);
            }
        ).catch( e => {
            console.error(e);
        })
    },[])

    return restaurantList.length ?
        <h1>{restaurantList[Math.round(Math.random() * 32)].name}</h1>
        : <span>nothing, sorry</span>
}
