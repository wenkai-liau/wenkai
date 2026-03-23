export const BookCategory = {
    TECHNICAL: 'Technical',
    HISTORY: 'History',
    OTHERS: 'Others'
 };

 export const BookStatus = {
    READ: 'Read',
    UNREAD: 'Unread',
    READING: 'Reading'
 };

 Object.freeze(BookCategory);
 Object.freeze(BookStatus);

export const openInNewTab = (url) => {
   const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
   if (newWindow) newWindow.opener = null
 }