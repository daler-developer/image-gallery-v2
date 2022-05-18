
class RequestError extends Error {
  constructor(status, type) {
    super('Some error')
    this.status = status
    this.type = type
  }
}

module.exports = RequestError
