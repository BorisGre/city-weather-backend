var cityCoordinate = require('./cityCoordinate')
var cityWeather = require('./cityWeather')

businessLayer = (settings,  memoryObj, cityCoordAndWeather) => { 

   return {
    async pipe(searchRequest){

      var outResp = {}
      var outData = {} 
      var ErrorData = {}

      var cityCoord = await this.getCityCoord(cityCoordAndWeather, searchRequest)
      var cityName = searchRequest
       console.log(`cityCoord`, cityCoord)
      var currentWeather = await this.getCurrentWeather(cityCoordAndWeather, cityCoord, cityName)
      console.log(`currentWeather`, currentWeather)
      var forecast = await this.getForecast(cityCoordAndWeather, cityCoord, cityName)
      console.log(`forecast`, forecast)
        //outData = cityCoord.status === 'ok' ? cityCoord : ErrorData                               
      //console.log(`pipe out data\n`, outData)
     var {lat, lon} = cityCoord
      outData = {city: searchRequest, coords: {lat, lon}, weather: {currentWeather, forecast}}
      return ({...outResp, ...outData})
  },

  async getCityCoord(cityCoordAndWeather, cityName){

      var cityCoord = await cityCoordinate(settings, cityCoordAndWeather, memoryObj.cityMemoryObj).get(cityName)
      console.log(`CityCoord`, cityCoord)
      var {lon, lat} = cityCoord.data
      console.log(`coord`, lon, lat, cityCoord)

      return {lon, lat}
        /* console.log(`get coord by cityname`, cityName, cityCoordAndWeather)
          var coord = cityCoordAndWeather.getCoord(cityName)
        return coord*/
 },

 async getCurrentWeather(cityCoordAndWeather, cityCoord, cityName){
      var cityCurrentWeather = await cityWeather(settings, cityCoordAndWeather, memoryObj.weatherMemoryObj).getCurrentWeather(cityCoord, cityName)
          console.log(`weather`, cityCurrentWeather)//, data[0].lon, data[0].lat)

      /* console.log(`get weather by citycoord`, cityCoord, cityCoordAndWeather)
        var currentWeather = cityCoordAndWeather.getCurrentWeather(cityCoord)
        return currentWeather*/
        return cityCurrentWeather
  },

  async getForecast(cityCoordAndWeather, cityCoord, cityName){
        console.log(`get weather forecast by citycoord`, cityCoord, cityCoordAndWeather)
        /* var forecast = cityCoordAndWeather.getForecast(cityCoord)
        return forecast*/
        var cityForecast = await cityWeather(settings, cityCoordAndWeather, memoryObj.weatherMemoryObj).getForecast(cityCoord, cityName)    
        console.log(`weather forecast`, cityForecast)
        return cityForecast
      }
  }
}

module.exports = businessLayer