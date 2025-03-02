function validateInput(Title, content){
    return (Title &&
        content &&
      Title.trim() !=='' &&
      content.trim() !== '')
}
module.exports ={
    validateInput :validateInput
}