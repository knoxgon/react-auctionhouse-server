
module.exports.validateUsername = function (element) {
    return !new RegExp(/[ ~`!#$%^()€¤äå._ö&*+@=\-\[\]\\';,/{}|":<>?]/)
        .test(element);
};

module.exports.validateEmail = function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}