const verifySession = (authPayload, status) => {
    //miramos la data de localStorage
    const tokenString = localStorage.getItem("token");
    //aqui llamamos los payload necesarios que necestiamos para poder realizar el login

    if (authPayload && status === "authenticated" && tokenString != null) {
        /* console.log("ESTAS VERIFICANDO", authPayload, status, tokenString); */
        return true
    } else {
        return false
    }
}

export default verifySession;