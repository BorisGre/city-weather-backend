var cityWeather = (settings, API, weatherCacheObj) => {
    var statuses = {noEntry: 'noEntry', entryExpired: 'entryExpired'}
    var weatherPeriods = {current: 'current', forecast: 'forecast'}
    return {
     async getCurrentWeather(cityCoords, cityName = ''){
         
        var currentWeather = this.getFromCache(cityCoords, cityName, weatherCacheObj)
        if(currentWeather.status == statuses.noEntry || currentWeather.status == statuses.entryExpired){
          return await this.getFromAPI(weatherPeriods.current, cityCoords, cityName)
        }
        return currentWeather
     }, 

     async getForecast(cityCoords, cityName = ''){
         
        var forecastFromCache = this.getFromCache(cityCoords, cityName, weatherCacheObj)
        if(forecastFromCache.status == statuses.noEntry || forecastFromCache.status == statuses.entryExpired){
          return await this.getFromAPI(weatherPeriods.forecast, cityCoords, cityName)
        }
        return forecastFromCache
     }, 

     getFromCache(cityCoords, cityName, weatherCacheObj){
        return weatherCacheObj.get(cityName, cityCoords, 'all')
     },

     async getFromAPI(period, cityCoords, cityName){
        var newRecord = await (period === weatherPeriods.current ? API.getCurrent(cityCoords) 
                                                                 : API.getForecast(cityCoords))                                                    
        if(newRecord.status == 'ok'){
            weatherCacheObj.put(cityName, period, newRecord)
        }
        return newRecord.status == 'ok' ? newRecord : {status: 'error', data: {}}
     }
  }
}

module.exports = cityWeather