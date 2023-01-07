import React, { useState } from 'react'
import SendMessageButton from '../../../resources/images/sendMessageButton.svg'

const NewMessage = () => {
    const [message, setMessage] = useState('');
    
    const handleKeyPressed =(event)=>{
        if(event.key === 'Enter'){
            event.preventDefault();
            

            sendMessage();
        }
        
    }

    const handleTextChange =(event)=>{
        
        setMessage(event.target.value);
    }
    
    const sendMessage =()=>{
        if(message.length > 0){
            console.log("Sending Messages To Other User");
            
        }
        
        setMessage('')
    }
    return (
        <div className='new_message_container'>
            <input
                className='new_message_input'
                value={message}
                onChange={handleTextChange}
                type='text'
                placeholder='Type Your Message'
                onKeyDown={handleKeyPressed}
            />
            <img className='new_message_button' src={SendMessageButton} onClick={sendMessage} />
        </div>
    )
}

export default NewMessage