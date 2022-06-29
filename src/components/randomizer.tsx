import  React, { useState, useEffect } from "react";
import { options } from "../rapidapi_options";
import axios from "axios";
import RandomForm from "./randomForm";
import {RequestParam} from "../models/requestParam";

type FormBody = {street: string; city: string, buildingNumber: number; requestParam: RequestParam};

export default function Randomizer () {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [chosenOne, setChosenOne] = useState<any>({});
    const [requestParam, setRequestParam] = useState<RequestParam>({
        limit: '1000',
        distance: '1',
        open_now: 'true',
        lunit: 'km',
        lang: 'en_US',
        min_rating: '4'
    })
    const [error, setError] = useState<string>('');

    useEffect(() => {
        getUserLocation();
    },[])

    useEffect(() => {
        if(requestParam.latitude && requestParam.longitude)
            fetchRestaurants()
    }, [requestParam])

    const fetchRestaurants = () => {
        setError('')
        axios({
            ...options,
            url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
            params: requestParam,
        }).then(
            res => {
                if(res.data.data.length)
                    setChosenOne(res.data.data[Math.round(Math.random() * res.data.data.length)]);
                else
                    setError('Found nothing');
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
                latitude: String(lat),
                longitude: String(lon)
            })
        }

        const error = (e: GeolocationPositionError) => {
            console.error(e);
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }

    const submitForm = (formBody: FormBody) => {
        if(formBody.street && formBody.buildingNumber && formBody.city)
            findCoordsFromAddress(formBody)
        else
            setRequestParam({
                ...requestParam,
                ...formBody.requestParam
            })
    }

    const findCoordsFromAddress = (formBody: FormBody) => {
        let {buildingNumber, street, city} = formBody;
        axios({
            method: "GET",
            url: `https://nominatim.openstreetmap.org/?addressdetails=1&street=${buildingNumber}+${street}&city=${city}&format=json`
        }).then(
            res => {
                let data = res.data[0];
                setRequestParam({
                    ...requestParam,
                    ...formBody.requestParam,
                    latitude: data.lat,
                    longitude: data.lon,
                })
            }
        )
    }

    return <>
        {!isLoading ?
            <h1>{error || chosenOne.name}</h1>
            : <span>still looking</span>}
        <RandomForm submit={submitForm}/>
    </>
}
