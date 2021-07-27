// errorBit – for checking if the error has occurred or not,
// msg – for displaying appropriate messages for which action is performed,
// data– sent to the user.
const IsError = (errorBit, msg, data) => {
    if (errorBit) return { is_error: errorBit, message: msg };
    else return { is_error: errorBit, message: msg, data };
};

module.exports = IsError;