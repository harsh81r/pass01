
import './App.css';
import { useState,useCallback,useEffect,useRef} from 'react';



function App() {
  const [length,setlength]=useState(8);                          //usestate                                                                                               
  const[numberAllowed,setnumberAllowed]  = useState(false);//usestate
  const[characterallowed,setcharacterallowed] = useState(false);//usestate
  const[password,setpassword] = useState("");//usestate


  //use Ref hooks
  const passwordRef =useRef(null)
  
  const passwordGEN = useCallback(()=>{
    let pass=""
    let str=
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numberAllowed) str +="0123456789"
    if(characterallowed) str +="!{}%&@[]$^~`"
    
    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
    
    pass +=str.charAt(char)
    }

    setpassword(pass)
  },[length,numberAllowed,characterallowed,setpassword])



  const copypassclipboard = useCallback(()=>{
    
   passwordRef.current?.select();
   passwordRef.current?.setSelectionRange(0,9999)
 
    window.navigator.clipboard.writeText(password)
  },
  [password])


useEffect(()=>{                                  //useEfrect
  passwordGEN()
},[length,numberAllowed,characterallowed,passwordGEN])





  return (
    <div className='text-center my-7 mx-20    rounded-lg  border-x-fuchsia-50 p-20 bg-stone-900'>
      <h2 className=" text-white text-4xl text-center">
Password-Generator
</h2>
<div className=" ">
</div>

<label className="rounded-lg border">
  <input type="text" value={password} placeholder='password......' readOnly ref={passwordRef}  className='my-20 h-10 w-50 font-sans p-3 text-xl  text-orange-700 rounded ' ></input></label>
<br></br>
<label ><button className="rounded-lg px-4 py-2 bg-blue-700 text-green-100 hover:bg-blue-800 duration-300    " 
 onClick={copypassclipboard}>COPY</button></label>
<br></br>
<div className="space-x-7">
<label className="text-orange-400 text-2xl"> Length  :{length} < input type= "range" min={6} max={100} value={length} className="cursor-pointer"
onChange={(e)=>{
  setlength(e.target.value)
}} >

</input>
</label>
<label className="text-orange-400 text-2xl"> Number : < input type='checkbox'  defaultChecked={numberAllowed} className='len'
 onClick={()=>{setnumberAllowed((prev)=> !prev)}}></input></label>

<label className="text-orange-400 text-2xl"> Charactor: < input type='checkbox'  className='len' defaultChecked={characterallowed}
 onClick={()=>{setcharacterallowed((prev)=> !prev)}}
></input></label>
</div>
  </div>
  );
}


export default App;
