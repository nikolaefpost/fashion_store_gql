export const handlerScrollUp = () => {
    console.log("scroll")

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
    });
}