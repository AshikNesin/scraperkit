let proxyUrl = null;

const getProxyUrl = () => {
    console.log({getProxyUrl:proxyUrl})
   return proxyUrl;
}
const setProxyUrl = proxy => {
    console.log({setProxyUrl:proxy})
    proxyUrl = proxy;
}

module.exports = {
    getProxyUrl,
    setProxyUrl,
    proxyUrl
}

// let proxyUrl = null
// class Proxy {

//     // constructor(){
//     // this.proxyUrl = null;
//     // }
//     getProxyUrl(){
//         return proxyUrl;
//     }

//     setProxyUrl(newProxyUrl){
//         console.log({newProxyUrl})
//         proxyUrl = newProxyUrl
//         return proxyUrl
//     }
// }

// module.exports = Proxy