module.exports = {
    MONGOID_PATTERN: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i ,
    ROLES: Object.freeze(
        {
            USER: "USER",
            ADMIN: "ADMIN",
            WRITER: "WRITER",
            TEACHER: "TEACHER",
            SUPLLIER: "SUPLLIER"
        }
    ),
    PERMISSIONS: Object.freeze(
        {
            USER: ["profile"],
            ADMIN: ["all"],
            CONTENT_MANAGER: ["course", "blogs", "category", "product"],
            TEACHER: ["course", "blogs"],
            SUPLLIER: ["product"],
            ALL: "all"
        }
    ),
    ACCESS_TOKEN_SECRET_KEY: "AA023ED42C5807544B6548EB77139FD1F8F58FBA4B6F9EC7F8D70A95A5242148",
    REFRESH_TOKEN_SECRET_KEY: "185CD053DEC381C0FF46510ADE694E52676E9A7912E5AFC8E281AEA40CAD6561"
}
// Token :
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTExMjI4NTUzMCIsImlhdCI6MTY3MzEyMTEzNCwiZXhwIjoxNjczMTI0NzM0fQ.hbe-PyoHo_yF3x-eWZHMm0YLaIvE-Ljzvq6UrGkGN00