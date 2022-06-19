import  React, { useState, useEffect } from "react";
import { options } from "../rapidapi_options";
import axios from "axios";

export default function Randomizer () {
    const [restaurantList, setRestaurantList] = useState<any[]>([]);
    const [responseLimit, setResponseLimit] = useState<number>(100);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [chosenOne, setChosenOne] = useState<any>({});

    useEffect(() => {
        const success = (position: GeolocationPosition) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            axios({
                ...options,
                url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
                params: {
                    latitude: lat,
                    longitude: lon,
                    limit: responseLimit,
                    distance: '1',
                    open_now: 'false',
                    lunit: 'km',
                    lang: 'en_US'
                },
            }).then(
                res => {
                    setResponseLimit(res.data.paging.total_results);
                    setRestaurantList(res.data.data);
                }
            ).catch( e => {
                console.error(e);
            }).then(() => {
                setLoading(false);
            })
        }

        const error = (e: GeolocationPositionError) => {
            console.error(e);
        }

        navigator.geolocation.getCurrentPosition(success, error);
    },[])

    useEffect(() => {
        if(restaurantList.length)
            setChosenOne(restaurantList[Math.round(Math.random() * responseLimit)])
    }, [responseLimit])

    return !isLoading && chosenOne?
        <>
            <h1>{chosenOne.name}</h1>
            <p>Found {responseLimit} restaurants</p>
        </>
        : <span>still looking</span>
}
