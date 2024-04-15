import Stomp from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

const WebSocketService = {
  stompClient: null,

  initializeWebSocketConnection: () => {
    const socket = new SockJS('http://localhost:5000/ws'); // Update URL as needed
    WebSocketService.stompClient = Stomp.over(socket);
    WebSocketService.stompClient.connect({}, () => {
      console.log('Connected to WebSocket');
    });
  },

  disconnectWebSocket: () => {
    if (WebSocketService.stompClient !== null) {
      WebSocketService.stompClient.disconnect();
      console.log('Disconnected from WebSocket');
    }
  },

  subscribeToTopic: (topic, callback) => {
    if (WebSocketService.stompClient !== null) {
      WebSocketService.stompClient.subscribe(topic, callback);
    }
  },

  sendMessage: (destination, message) => {
    if (WebSocketService.stompClient !== null && message !== null) {
      WebSocketService.stompClient.send(destination, {}, JSON.stringify(message));
    }
  },
};

export default WebSocketService;
