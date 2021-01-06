const keys = require('../keys');

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Reset password',
        html: `
            <h1>You forgot the password</h1>
            <p>If no then ignore this message</p>
            <p>If you really forgot your password click on link below</p>
            <p><a href="${keys.BASE_URL}/auth/password/${token}">Reset password</a></p>
            <hr />
            <a href="${keys.BASE_URL}">Courses shop</a>
        `,
    }
}