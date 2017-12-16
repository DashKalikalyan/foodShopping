
const authenticate=(req,res,next) => {
    console.log('In authenticate');
    next();
};

module.exports = {authenticate};