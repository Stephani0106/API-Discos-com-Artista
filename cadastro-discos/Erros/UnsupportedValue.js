class UnsupportedValue extends Error{
    constructor(contentType) {
        super(`Content type '${contentType}' is not supported `)
        this.name = "UnsupportedValue"
        this.idErro = 1
    }
}

module.exports = UnsupportedValue