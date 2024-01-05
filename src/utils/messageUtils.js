export const truncateMessage = (message) => {
    if (message.length <= 60) {
      return message;
    } else {
      return `${message.slice(0, 60)}...`;
    }
  };