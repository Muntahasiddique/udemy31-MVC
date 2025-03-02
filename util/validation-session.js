function getSessionError(req , defaultvalue){
    let sessionInputData = req.session.inputData;
  
    if (!sessionInputData) {
      sessionInputData = {
        hasError: false,
       ...defaultvalue
      };
    }
  
    req.session.inputData = null;
    return sessionInputData;
}

function flashErroRstoSession(req,data,action){
    req.session.inputData = {
        hasError: true,
      ...data
      };
      req.session.save(action);
}
module.exports={
    getSessionError :getSessionError,
    flashErroRstoSession:flashErroRstoSession
}
