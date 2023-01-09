
export const unSubscribe = (list,fun) => { 
    let tokens = list.map(val => val.token);
    let unSubscribeMessage = {
        msg_command: "unsubscribe",
        data_type: "quote",
        tokens
    }
    fun(unSubscribeMessage);
}

export const subscribe = (list,fun) => { 
    let tokens = list.map(val => val.token);
    const subscribeMessage = {
        "msg_command": "subscribe",
        "data_type": "quote",
        tokens
    };
    fun(subscribeMessage);
}