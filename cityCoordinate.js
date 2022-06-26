var cityCoordinate = (settings, API, cacheObj) => {
    return {
     async get(cityName){
    
        var coordsFromCache = this.getFromCache(cityName, cacheObj)
        console.log(`coordsFromCache`, coordsFromCache, coordsFromCache.status, coordsFromCache.status == 'noEntry')
        if(coordsFromCache.status == 'noEntry' || coordsFromCache.status == 'entryExpired'){
            console.log(`get coordinate from API`)
          return await this.getFromAPI(cityName)
        }
        return coordsFromCache
     }, 

     getFromCache(cityName, cacheObj){
        return cacheObj.get(cityName)
     },

     async getFromAPI(cityName){
         console.log(`getFromAPi cityCoordinate`, API)
        var newRecord = await API.getCoord(cityName)
        var outData = JSON.parse(newRecord['data'])[0] || {} 
        if(newRecord.status == 'ok'){
            cacheObj.put(cityName, outData)
        }

        console.log(`GET FROM API outData`, outData)
        return newRecord.status == 'ok' ? {status: 'ok',    data: outData} 
                                        : {status: 'error', data: outData}
     }
  }
}

module.exports = cityCoordinate