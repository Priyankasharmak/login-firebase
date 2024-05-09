
import { GoogleAuthProvider ,onAuthStateChanged,signInWithPopup} from 'firebase/auth'

import './App.css'
import { auth ,app} from '../firebase';
import { useEffect, useState } from 'react';
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { get } from 'firebase/database';

const db=getFirestore(app)

function App() {
  const [user,setuser]=useState(null)
  const [message,setmessage]=useState([])
  const [newmessage,setnewmessage]=useState("")

  useEffect(()=>{
    const q = query(collection(db,"messages"),orderBy("timestamp"))
    const unsubscribe = onSnapshot(q,snapshot =>{
      setmessage(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data()
      })))
      
      

    })
   
    return unsubscribe;
  },[])

  useEffect(()=>{
    onAuthStateChanged(auth,user =>{
      if(user){
        setuser(user)
      }else{
        setuser(null)
      }
    })
  },[])
  
  const sendmessage = async()=>{
    await addDoc(collection(db,"messages"),{
      uid:user.uid,
      photoURL: user.photoURL,
      displayName:user.displayName,
      text:newmessage,
    timestamp:serverTimestamp()    })
    setnewmessage("")
  }
  
  const handleGooglelogin= async()=>{
    const provider= new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth,provider)
    } catch (error) {
      console.log("hi")
      
    }

  }
  return (
    
    <div className='APP'>
      {
       user?(
        <>
        {/* <div>logged in as{user.displayName}</div> */}
        <input 
        value={newmessage}
        onChange={e=> setnewmessage(e.target.value)}/>
        <button onClick={sendmessage}>Send message</button>
        <button onClick={()=>auth.signOut()}>logout</button>
        
        
        
        {message.map(msg => (
          <div  key={msg.id} className={msg.data.uid === user.uid ? 'mytext' : 'ourtext'}>
          <div className={`message flex flex-row p-3 gap-3 rounded-[20px] items-center ${msg.data.uid === user.uid ? ' text-white bg-blue-500' : ' bg-white '}`}>
            <img className='w-10 h-10 rounded-full' src={msg.data.photoURL} />
           {msg.data.text}
          </div>
          </div>
        ))}

        </>) : 
 <button onClick={handleGooglelogin}>Login with google</button>}
      
    </div> )
    
  
}

export default App ;