import React, {useState, FormEvent} from "react";

export default function RandomForm (props: any) {
    const [distance, setDistance] = useState<number>(1);
    const [street, setStreet] = useState<string>('');
    const [buildingNumber, setBuildingNumber] = useState<number>();
    const [city, setCity] = useState<string>('')
    const [open_now, setOpen_now] = useState<boolean>(true)

    const submitForm = (event: FormEvent) => {
        event.preventDefault();
        props.submit({street: street, city, buildingNumber, requestParam: {distance, open_now: open_now}})
    }

    return <form onSubmit={e => submitForm(e)}>
        <div>
            <label htmlFor="distance">Distance</label>
            <input type="number" name="distance" value={distance} onChange={e => setDistance(Number(e.target.value))}/>
        </div>
        <div>
            <label htmlFor="street">Street</label>
            <input type="text" name="street" value={street} onChange={e => setStreet(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="buildingNumber">Building number</label>
            <input type="text" name="buildingNumber" value={buildingNumber} onChange={e => setBuildingNumber(Number(e.target.value))}/>
        </div>
        <div>
            <label htmlFor="city">City</label>
            <input type="text" name="city" value={city} onChange={e => setCity(e.target.value)}/>
        </div>
        <div>
            <label><input type="checkbox" name="open_now" checked={open_now} onChange={e => setOpen_now(e.target.checked)}/>Open now</label>
        </div>
        <button type="submit">Submit</button>
    </form>

}
