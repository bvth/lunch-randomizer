import  React, { useState, useEffect } from "react";
import { options } from "../rapidapi_options";
import axios from "axios";
import RandomForm from "./randomForm";
import {RequestParam} from "../models/requestParam";

export default function Randomizer () {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [chosenOne, setChosenOne] = useState<any>({});
    const [requestParam, setRequestParam] = useState<RequestParam>({
        latitude: NaN,
        longitude: NaN,
        limit: '1000',
        distance: '1',
        open_now: 'true',
        lunit: 'km',
        lang: 'en_US',
        min_rating: '4'
    })

    const randomLimit = 30;

    useEffect(() => {
        getUserLocation();
    },[])

    useEffect(() => {
        if(requestParam.latitude && requestParam.longitude)
            fetchRestaurants()
    }, [requestParam])

    const fetchRestaurants = () => {
        axios({
            ...options,
            url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
            params: requestParam,
        }).then(
            res => {
                setChosenOne(res.data.data[Math.round(Math.random() * res.data.data.length)]);
            }
        ).catch( e => {
            console.error(e);
        }).then(() => {
            setLoading(false);
        })
    }

    const getUserLocation = () => {
        const success = (position: GeolocationPosition) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            setRequestParam({
                ...requestParam,
                latitude: lat,
                longitude: lon
            })
        }

        const error = (e: GeolocationPositionError) => {
            console.error(e);
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }

    return <>
        {!isLoading && chosenOne.name ?
            <>
                <h1>{chosenOne.name}</h1>
            </>
            : <span>still looking</span>}
        <RandomForm/>
    </>
}
