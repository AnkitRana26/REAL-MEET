import React from 'react'

const Input =({placeholder,value,changeHandler})=>{

    return (
        <input value={value} onChange={changeHandler} placeholder={placeholder} className='join_room_input' />
    )

}



const JoinRoomInput = ({roomIdValue,setRoomIdValue,nameValue,setNameValue,isRoomHost}) => {

    const handleRoomIdValueChange =(event)=>{
        setRoomIdValue(event.target.value);
    }
    const handleNameValueChange =(event)=>{
        setNameValue(event.target.value)
    }


  return (
    <div className='join_room_inputs_container'>

        {!isRoomHost?<Input placeholder={'Enter Meeting Id'} value={roomIdValue} changeHandler={handleRoomIdValueChange}/>:""}
        <Input placeholder={'Enter Your Name'} value={nameValue} changeHandler={handleNameValueChange}/>


    </div>
  )
}

export default JoinRoomInput