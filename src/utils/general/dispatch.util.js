const requestLoading =(constVal,isLoading,loadingPart) =>{
    return {
        type:constVal,
        payload:{
            loading : isLoading,
			loadingPart : loadingPart
        }
    }
}

const dispatchAction = (action,payload)=>{
    let obj = {type : action}
    if(payload) obj.payload = payload
    // console.log("dispatch action")
    // console.log(obj)
    return obj
}

const succes = (res,constVal) => {
    return {
        type:constVal,
        payload:res
    }
}

const failure = (err,constVal) =>{
    return {
        type:constVal,
        payload:err
    }
}

export {
    requestLoading,succes,failure,dispatchAction
}