import React, { useRef } from 'react';

const ChatTextBox = ({ onChatUpdate }) => {
  const textAreaEl = useRef(null);
  const handleBtnClick = () => {
    const newChatLog = textAreaEl.current.value;

    onChatUpdate(`${newChatLog}`);
  };

  return (
    <div>
      <strong className="is-title">Respond to the customer here:</strong>
      <textarea
        ref={textAreaEl}
        style={{ width: '50%', height: '250px', margin: '0 auto' }}
        className="is-flex"
      ></textarea>
      <button className="button is-info mt-4" onClick={handleBtnClick}>
        Respond
      </button>
    </div>
  );
};

export default ChatTextBox;
