export const scrollToBottom = () => {
    const main = document.querySelector('main');
    if (main) main.scrollTo(0, main.scrollHeight);
}