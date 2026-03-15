module.exports = class UserDto {
    login
    id
    role
    isActivated

    constructor(model) {
        this.login = model.login
        this.id = model._id
        this.role = model.role
        this.isActivated = model.isActivated
    }
}