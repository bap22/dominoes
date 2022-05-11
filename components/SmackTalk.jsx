import React, { useEffect, useState } from 'react';
import { useSmackTalkChannel } from './SmackTalkAbly';
import styles from './Dominoes.module.css';

const SmackTalk = () => {
    let inputBox = null;
    let messageEnd = null;

    const [messageText, setMessageText] = useState('');
    const [receivedMessages, setMessages] = useState([]);
    const messageTextIsEmpty = messageText.trim().length === 0;

    const [channel, ably] = useSmackTalkChannel('dominoes-chat', (message) => {
        const history = receivedMessages.slice(-199);
        setMessages([...history, message]);
    });

    const sendChatMessage = (messageText) => {
        channel.publish({ name: 'chat-message', data: messageText });
        setMessageText('');
        inputBox.focus();
    };

    // check to make sure you can play it.
    // drop it in the correct position
    const handleFormSubmission = (event) => {
        event.preventDefault();
        console.warn(messageText);
        sendChatMessage(messageText);
    };

    // drop the domino - keypress or onmousedrop
    // check to make sure you can play it
    const handleKeyPress = (event) => {
        if (event.charCode !== 13 || messageTextIsEmpty) {
            return;
        }
        sendChatMessage(messageText);
        event.preventDefault();
    };

    const messages = receivedMessages.map((message, index) => {
        console.warn('messages', message, index);
        const author =
            message.connectionId === ably.connection.id ? 'me' : 'other';
        return (
            <span key={index} className={styles.message} data-author={author}>
                {message.data}
            </span>
        );
    });

    useEffect(() => {
        messageEnd.scrollIntoView({ behaviour: 'smooth' });
    });

    return (
        <div className={styles.chatHolder}>
            <div className={styles.chatText}>
                {messages}
                <div
                    ref={(element) => {
                        messageEnd = element;
                    }}
                ></div>
            </div>
            <form onSubmit={handleFormSubmission} className={styles.form}>
                <textarea
                    ref={(element) => {
                        inputBox = element;
                    }}
                    value={messageText}
                    placeholder="Type a message..."
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={styles.textarea}
                ></textarea>
                <button
                    type="submit"
                    className={styles.button}
                    disabled={messageTextIsEmpty}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default SmackTalk;
