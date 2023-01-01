import logo from './logo.svg';
import './App.css';

// Import set state
import { useState } from 'react';

function App() {

  // Create states for our three components
  const [program, setProgram] = useState('');
  const [conversation, setConversation] = useState('');
  const [memories, setMemories] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(conversation);
    // Fetch request from the API sending the conversation, memory, and program to localhost:5000
    fetch('http://127.0.0.1:5000/completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        conversation: conversation,
        memories: memories,
        program: program
    })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      // Append the new conversation to the current conversation
      setConversation(conversation + data['data']);

      // setConversation(data);
    }
    )
  }

  return (
    <div className="App">
      <aside className="sidebar">
        <div className="side-menu-button">
          + New chat
        </div>
      </aside>

      <section className='main'>

        {/* Creating a text region to store the main program*/}
        <div className='text-region'>
          <h1>Core program</h1>
          <div className='program'>
        <textarea className='program-text'
         value={program}
         onChange={(e) => setProgram(e.target.value)}
         placeholder='Enter the initial prompt that defines the agent...'>
        </textarea>
        </div>
        </div>

      {/* Creating a text region to store memories from previous interactions */}
      <div className='text-region'>
        <h1>Memories</h1>
        <div className='memories'>
        <textarea className='memories-text'
          value={memories}
          onChange={(e) => setMemories(e.target.value)}
          placeholder='Add key memories acting as one-shot learning examples...'>
          </textarea>
        </div>
      </div>

      {/* Creating a text region to store the current conversation */}
      <div className='text-region'>
        <h1>Conversation</h1>
        <div className='conversation'>
           <textarea className='conversation-text'
           value={conversation}
           onChange={(e) => setConversation(e.target.value)}
           onSelect={(e) => console.log(e.target.value)}
          placeholder='Type a message...'>
          </textarea>
        </div>
      </div>


      {/* Adding a bottom bar with a submit button */}
      <div className='bottom-bar'>
        <button className='submit-button' onClick={handleSubmit}>Submit</button>
      </div>
      </section>

      <aside className="memory-bar">
        <div className="side-menu-button">
          + New memory
        </div>
      </aside>
    </div>
  );
}

export default App;
