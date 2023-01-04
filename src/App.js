import { useEffect, useState } from 'react';
import {firestore} from './firebase';
import { NewDeveloper } from './NewDeveloper';
import './App.css'

const App = () => {
  const [ developers, setDevelopers] = useState([])
  const [currentId, setCurrentId] = useState('')

  const getDevelopers = async () => {
    /* const querySnapshot = await firestore.collection('links').get();
    querySnapshot.forEach( doc => {
      console.log(doc.data())
    }) */
    firestore.collection('links').onSnapshot(querySnapshot => {
      console.log(querySnapshot);
      const docs = []
      querySnapshot.forEach(doc => {
        docs.push({...doc.data(), id: doc.id});
      })
      setDevelopers(docs)
      //console.log(querySnapshot.map( query => ({...query.data(), id: query.id})))
      
    });
    
  }

  useEffect(async () => {
    getDevelopers()
  }, [])

  const addLinks = async (developer) => {
    if(!!currentId) {
      await firestore.collection('links').doc(currentId).update(developer)
      console.log('Registro actualizado')
    } else {
      await firestore.collection('links').doc().set(developer)
      console.log('Nuevo registro agregado')
    }
    
  }

  const removeDeveloper = async (id) => {
    if(window.confirm("Are you sure you want to delete this developer")) {
      await firestore.collection('links').doc(id).delete();
      console.log('Task deleted')
    }
  }

  const editDeveloper = id => {
    setCurrentId(id)
  }

  return (
    <>
      <h1>List developers</h1>
      <NewDeveloper addLinks={addLinks} currentId={currentId} />
      <button onClick={() => addLinks()}>Agregar</button>
      {developers.map(dev => (
        <div className='row' key={dev.id}>
          <span>{dev.name} {dev?.area}</span>
          <span onClick={() => removeDeveloper(dev.id)}>Remove</span>
          <span onClick={() => editDeveloper(dev.id)}>Edit</span>
        </div>
      ))}
    </>
  );
}

export default App;
