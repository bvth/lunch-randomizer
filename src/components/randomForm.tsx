import React, {useState, FormEvent} from "react";

export default function RandomForm (props: any) {
    const [distance, setDistance] = useState<number>(1);
    const [address, setAddress] = useState<string>('');
    const [open_now, setOpen_now] = useState<boolean>(true)

    const submitForm = (event: FormEvent) => {
        event.preventDefault();
        props.submit({distance, open_now: open_now})
    }

    return <form onSubmit={e => submitForm(e)}>
        <div>
            <label htmlFor="distance">Distance</label>
            <input type="number" name="distance" value={distance} onChange={e => setDistance(Number(e.target.value))}/>
        </div>
        <div>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" value={address} onChange={e => setAddress(e.target.value)}/>
        </div>
        <div>
            <label><input type="checkbox" name="open_now" checked={open_now} onChange={e => setOpen_now(e.target.checked)}/>Open now</label>
        </div>
        <button type="submit">Submit</button>
    </form>

}
