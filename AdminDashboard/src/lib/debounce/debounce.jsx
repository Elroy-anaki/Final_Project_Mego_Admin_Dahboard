export function debounce(func, timeout= 1000) {
    let time;
    return(...args) => {
        clearTimeout(time);
        time = setTimeout(() =>  func(args), timeout )
    }
}