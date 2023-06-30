const {useRef} = require("react");

export const useScrollUp = () => {
    const ref = useRef(null);
    const scrollUp = () => {
        ref.current?.scrollIntoView();
    }
    return [ref, scrollUp]
}