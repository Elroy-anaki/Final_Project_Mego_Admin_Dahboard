export function debounce(func, timeout= 300) {
    let time;
    return(...args) => {
        clearTimeout(time);
        time = setTimeout(() =>  func(args), timeout )
    }
}