const add = (a, b, callback) => {
    setTimeout(() => {
        console.log('Time is up')
        

        callback(a + b)
    }, 2000)
}


add(1, 4, (sum) => {
    console.log(sum)
})