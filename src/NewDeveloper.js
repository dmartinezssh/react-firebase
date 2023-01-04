import { useEffect, useState } from 'react'
import './NewDeveloper.css'
import {firestore} from './firebase';


export const NewDeveloper = ({addLinks, currentId}) => {
    const initialState = {
        name: '',
        area: ''
    }
    const [developer, setDeveloper] = useState(initialState)

    const getDeveloperById = async id => {
        const doc = await firestore.collection('links').doc(id).get();
        setDeveloper({...doc.data()})
    }

    useEffect(() => {
        if(!!currentId) {
            getDeveloperById(currentId)
        } else {
            setDeveloper({...initialState})
        }
    }, [currentId])

    const updateField = (e) => {
        const { name, value } = e.target;
        setDeveloper({...developer, [name]: value})
    }

    const sendInfo = e => {
        e.preventDefault();
        addLinks(developer)
        setDeveloper({...initialState})
        console.log(developer)
    }

    return (
        <>
            <h1>This is form</h1>
            <form onSubmit={sendInfo}>
                <input
                    name='name'
                    placeholder="Name"
                    onChange={updateField}
                    value={developer.name}
                />
                <input
                    name='area'
                    placeholder="Area"
                    onChange={updateField}
                    value={developer.area}
                />
                <button type="submit">
                    {!!currentId ? 'Actualizar' : 'Enviar'}
                </button>
            </form>
        </>
    )
}