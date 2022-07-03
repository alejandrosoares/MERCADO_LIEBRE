const Model = require('./model')
const { 
    INVALID_LOGIN_MSG, 
    ACCOUNT_ALREADY_EXIST_MSG,
    ID_NOT_FOUND_MSG,
    EMAIL_NOT_FOUND_MSG
    } = require('./messages/user')

const NOT_IMG = 'default-avatar.jpg'
const USER_DB = 'userDB.json'


class UserModel extends Model {
    static _ID = 0

    validFields = [
        'name', 'surname', 'email',
        'password', 'role', 'avatar'
    ]

    constructor(dbFile) {
        super(dbFile, UserModel)
        this._initializeID()
    }

    _createImgField = fields => {
        if (!fields.avatar) fields.avatar = NOT_IMG
    }

    _updateImgField = (user, fields) => {
       if (!fields.avatar) fields.avatar = user.avatar
    }

    /**
     * Remove password field of a copy of user object
     * @param {Object} user
     * @return {Object} user: object without password field
     */
    _clearUserObj = user => {
        const clearUser = JSON.parse(JSON.stringify(user))
        delete clearUser.password
        return clearUser
    }

    _findByEmail = email => {
        const user = this.data.find(user => user.email === email) || null
        return user 
    }

    /**
     * 
     * @param {String} email: email to search
     * @param {String} password: password to verify
     * @returns {Boolean} if email  was found and password matches
     */
    _checkPassword = (email, password) => {
        const user = this._findByEmail(email)

        if (user) {
            if (user.password === password) return true
        }
        return false
    }

    /** Asign role 2 (user) and clear field id
     * @param {Object} user object
     */
    _normalizeFields = fields => {
        fields.role = 2
        delete fields.id
    }

    /**
     * Search user by id
     * @param {int} id: id to search
     * @return {Object} response
     * {
     *  error: object with error message or null
     *  user: user object
     * }
     */
     findById = id => {
        const user = this._findById(id)

        return {
            error: user? null: {message: ID_NOT_FOUND_MSG},
            user:  user? this._clearUserObj(user): null
        }
    }

    /**
     * Search user by email
     * @param {String} email 
     * @return {Object} user: if user is found
     * @return {null} null: if user is not 
     */
    findByEmail = email => {
        let user = this._findByEmail(email)

        return {
            error: user? null: {message: EMAIL_NOT_FOUND_MSG},
            user:  user? this._clearUserObj(user): null
        }
    }

    /**
     * Returns list of users whole role is passed as a parameter
     * @param {int} role
     * @return {Array}
     */
    findByRole = role => {
        const usersWithRole = this.data.filter(user => user.role === role)
        return usersWithRole
    }

    /**
     * Login user
     * @param {String} email
     * @param {String} password
     * @return {Object} response
     * {
     *  error: object with error message or null
     *  user: user object
     * } 
     */
    login = (email, password) => {
        const logged = this._checkPassword(email, password) 
   
        return {
            error: !logged? { message: INVALID_LOGIN_MSG}: null,
            user: logged? this.findByEmail(email): null
        }
    }

    /**
     * Register user
     * @param {req.body} fields: fields of user object
     * @param {req.file} file: fields of file object
     * @return {Object} response
     * {
     *   error: con objeto error o null si no se produjo ningun error,
     *   user: Con objeto user o null si se produjo un error
     * }
     */
    register = (fields, file) => {
        if (this._findByEmail(fields.email)) {
            // delete user image (TO IMPLEMENT)
            return {
                error: {message: ACCOUNT_ALREADY_EXIST_MSG},
                user: null
            }
        }

        let newUser = {id: this._getID()}
        fields.avatar = file? file.filename: ""
        this._normalizeFields(fields)
        this._createImgField(fields)
        Model.loadFieldsInObj(newUser, fields, this.validFields)
        this.data.push(newUser)
        this.save()
        return {
            error: null,
            user: this._clearUserObj(newUser)
        }
    }

}

const userModel = new UserModel(USER_DB);

module.exports = userModel;

