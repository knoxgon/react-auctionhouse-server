
module.exports = function (element) {
    return !new RegExp(/[ ~`!#$%^()€¤äå._ö&*+@=\-\[\]\\';,/{}|":<>?]/)
        .test(element);
};
