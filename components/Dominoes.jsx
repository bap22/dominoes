import React, { useEffect, useState } from 'react';
import { useChannel } from './DominoesAbly';
import styles from './Dominoes.module.css';

const Dominoes = () => {
    let inputBox = null;
    let messageEnd = null;

    const [messageText, setMessageText] = useState('');
    const [receivedMessages, setMessages] = useState([]);
    const messageTextIsEmpty = messageText.trim().length === 0;

    const [channel, ably] = useChannel('dominoes-game', (message) => {
        const history = receivedMessages.slice(-199);
        setMessages([...history, message]);
    });

    const sendChatMessage = (messageText) => {
        channel.publish({ name: 'dominoes-play', data: messageText });
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
        <div className={styles.playArea}>
            <div className={styles.board}>
                {messages}
                <div
                    ref={(element) => {
                        messageEnd = element;
                    }}
                ></div>
            </div>
            <div className={styles.myDominoes}>My Dominoes</div>
        </div>
    );
};

export default Dominoes;
