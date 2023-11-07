import getExpeditiousCache from "express-expeditious"

// & config cacheMemory
const cacheMemory = {
    namespace: "expresscache", // Namespace used to prevent cache conflicts, must be alphanumeric
    defaultTtl: "2 days",
    statusCodeExpires: {
        404: "5 minutes",
        500: 0
    }
}

// add object cacheMemory to function cache
const cacheInit = getExpeditiousCache(cacheMemory)

export default cacheInit