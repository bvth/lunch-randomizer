import  React, { useState, useEffect } from "react";
import { options } from "../rapidapi_options";
import axios from "axios";

export default function Randomizer () {
    const [restaurantList, setRestaurantList] = useState<any[]>([]);
    const [randomLimit, setRandomLimit] = useState<number>(100);
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
                    limit: '1000',
                    distance: '1',
                    open_now: 'false',
                    lunit: 'km',
                    lang: 'en_US'
                },
            }).then(
                res => {
                    setRestaurantList(res.data.data);
                    setRandomLimit(Number(res.data.paging.results));
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
            setChosenOne(restaurantList[Math.round(Math.random() * randomLimit)])
    }, [randomLimit])

    return !isLoading && chosenOne?
        <>
            <h1>{chosenOne.name}</h1>
            <p>Found {randomLimit} restaurants</p>
        </>
        : <span>still looking</span>
}
