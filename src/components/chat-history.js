import React from 'react';

const ChatHistory = ({ chatLog }) => {
  return (
    <div className="has-background-link-light pb-6 pt-4 mt-4">
      <h2 className="title is-2">Chat History</h2>
      <ul>
        {chatLog.map((log) => (
          <li key={log}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;
