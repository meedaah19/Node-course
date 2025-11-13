import {calculateTip, fahrenheitToCelcius, celsiusToFahrenheit, add} from '../src/map.js'

test('Should calculate tottal with tip', ()=> {
    const total = calculateTip(10, .3)

    expect(total).toBe(13)
})

test('Should calculate total with default tip', ()=> {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('should convert 32 F to 0 C', () => {
    const fahrenheit = fahrenheitToCelcius(32) 
    expect(fahrenheit).toBe(0)

})

test('Should convert 0 C to 32 F', () => {
    const celcius = celsiusToFahrenheit(0)
    expect(celcius).toBe(32)
})

test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers', async () => {
    const sum = await add(10, 19)
        expect(sum).toBe(29)
})