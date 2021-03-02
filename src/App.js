import { fromMic, fromText } from './speech-service';
import { useEffect, useState } from 'react';
import './App.css';
import ChatTextBox from './components/chat-text-box';
import ChatHistory from './components/chat-history';
import '../node_modules/bulma/css/bulma.css';

function App() {
  const [chatLog, setChatLog] = useState([
    `Conversation Started at ${new Date()}`,
  ]);

  const handleAgentUpdate = async (text) => {
    const agentText = `Help Desk Agent: ${text}`;
    setChatLog((prevLog) => [...prevLog, agentText]);
    fromText(text);
  };

  useEffect(() => {
    const callback = (spokenText) =>
      setChatLog((prevLog) => [...prevLog, `Customer: ${spokenText}`]);
    fromMic(callback);
  }, []);

  return (
    <div className="container is-max-desktop has-text-centered">
      <main>
        <h1 className="title is-1">Easy Chat Journey</h1>

        <ChatTextBox onChatUpdate={handleAgentUpdate} />
        <ChatHistory chatLog={chatLog} />
      </main>
    </div>
  );
}

export default App;
