import { useEffect, useState } from 'react';
import {firestore} from './firebase';

const App = () => {
  const [ developers, setDevelopers] = useState([])

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

  const addLinks = async () => {
    await firestore.collection('links').doc().set({name: 'jocelyn', job: 'developer'})
    console.log('Nuevo registro agregado')
  }

  const removeDeveloper = async (id) => {
    if(window.confirm("Are you sure you want to delete this developer")) {
      await firestore.collection('links').doc(id).delete();
      console.log('Task deleted')
    }
  }

  return (
    <>
      <h1>PRUEBA DE FIREBASE</h1>
      <button onClick={() => addLinks()}>Agregar</button>
      {developers.map(dev => (
        <h1>
          <span>{dev.name}</span>
          <span onClick={() => removeDeveloper(dev.id)}>Remove</span>
        </h1>
      ))}
    </>
  );
}

export default App;
