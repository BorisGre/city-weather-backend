var settings = {
    port: 8000,
    cacheRecordLifeTime: 900,//second = 15 min
    geoCoordAndWeather: {
        port: 443,
        apiKey: '2d12e5f75479307f2533681126bd90cd',
        hostname: `api.openweathermap.org`,
    },
    githubToken: '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'
}
module.exports = settings
//'https://api.github.com/search/repositories?q=node&sort=updated&order=desc&page=5'
//https://api.github.com/search/repositories?q=node