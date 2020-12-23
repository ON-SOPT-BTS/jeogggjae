module.exports = {
    secretKey: "SecretKeySoptSeRvER",
    options: {
        algorithm: "HS256",
        expiresIn: "1h",
        issuer: "jeongggjae",
    },
    refreshOptions: {
        algorithm: "HS256",
        expiresIn: "7d",
        issuer: "jeongggjae",
    }
}
