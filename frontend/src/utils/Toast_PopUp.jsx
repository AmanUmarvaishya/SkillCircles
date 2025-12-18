import {toast} from 'react-toastify'


export const handleSuccess = (msg)=>{
    toast.success(msg ,{
        position:'top-center',
        type:'success',
        theme:'light'
    })
}

export const handleError = (msg)=>{
    toast.error(msg ,{
        position:'top-center',
        type:"error",
        theme:'colored',
        
    })
}

export const handleWarning = (msg)=>{
    toast.error(msg ,{
        position:'top-center',
        type:'warning'
        
        
    })
}
