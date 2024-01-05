export function fromISOtoTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
  
    const timeDifference = now - date;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (seconds < 60) {
      return 'just now';
    } else if (minutes < 60) {
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 7) {
      return `${days}d ago`;
    } else if (days >= 7 && days < 365) {
      // Format date as 'dd/mm' if more than 7 days but less than 1 year
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
      return formattedDate;
    } else {
      // Format date as 'dd/mm/yy' if more than 1 year
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
      return formattedDate;
    }
  }