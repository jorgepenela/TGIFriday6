function foreachAsync(arr, callBack, onFinish) {
    if (onFinish===undefined) {
        onFinish = ()=>console.log("FUNCIONOOOOOOOOOOOOOOOOOOOOO!!!!");
    }

    let idx = 0;
    (function foreachAsyncInterna() {
        if (idx == arr.length) {
            onFinish();
            return;
        }
        callBack(arr[idx], ()=>{
            setTimeout(foreachAsyncInterna, 1);
        }, ()=>{
            onFinish('el proceso aborto');
        });
        idx++;
    }());
}

module.exports = foreachAsync;