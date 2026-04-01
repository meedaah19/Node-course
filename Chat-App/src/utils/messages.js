const generateMessage = (text) => {
    return{
        text,
        created: new Date().getTime()
    }
}

const  generateLocationMessage = (url) => {
    return {
        createdAt: new Date().getTime()
    }
}

export {generateMessage, generateLocationMessage}