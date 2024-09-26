class ReadError extends Error {
    constructor(message, cause) {
        super(message)
        this.cause = cause
        this.name = 'ReadError'
    }
}

class ValidationError extends Error {}
class PropertyRequiredError extends ValidationError {}

function validateUser(user) {
    if(!user.age) {
        throw new PropertyRequiredError('age')
    }
    if(!user.name) {
        throw new PropertyRequiredError('name')
    }
}

function readUser(json) {
    let user;
    try {
        user = JSON.parse(json);
    }catch(err) {
        if(err instanceof SyntaxError) {
            throw new ReadError('Syntax Error', err)
        }
    }
    try {
        validateUser(user)
    }catch(err) {
        if(err instanceof ValidationError) {
            throw new ReadError('validationError', err)
        }else{
            throw err
        }
    }
}

// 如果有一个错误，后边的错误就不抛了。

try {
    // const obj = {name: 'lee'}
    // readUser(JSON.stringify(obj))
    readUser('{ssss}') // err1
}catch(err) {
    if(err instanceof ReadError) {
       console.log('OriginalError: ' + err.cause)
    }
}