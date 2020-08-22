module.exports = {
    isUndefinedOrNull: function (param) {
        return param == undefined || param == null;
    },
    isUndefinedOrNullOrEmpty: function (param) {
        return param == undefined || param == null || param == '';
    },
    isUndefinedOrNullOrEmptyOrZero: function (param) {
        return param == undefined || param == null || param == '' || param == '0';
    }
}
