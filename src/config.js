// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'turki bot how can i help you ?';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;