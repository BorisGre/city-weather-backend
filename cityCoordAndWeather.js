var CityCoordAndWeather = (https, settings) => {

    return {
        fabric(path){
            httpOptions = {
                hostname: settings.geoCoordAndWeather['hostname'],
                port: settings.geoCoordAndWeather['port'],
                method: `GET`,
                path,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            return (() => this.getData(httpOptions))
        },

        async getCoord(cityName){
            console.log(`GET COORD\n`)
            var path = `/geo/1.0/direct?q=${cityName}&limit=1&appid=${settings.geoCoordAndWeather['apiKey']}`
            return await this.fabric(path)()
        },

        async getDailyForecast({lat, lon, cnt = 10}){//cnt => number of days

            var path = `/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=metric&cnt=${cnt}&appid=${settings.geoCoordAndWeather['apiKey']}`
            return await this.fabric(path)()
        },

        async getForecast({lat, lon}){//3 hours for 5 days 

          var path = `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${settings.geoCoordAndWeather['apiKey']}`
          return await this.fabric(path)()
        }, 

        async getCurrent({lat, lon}){

            var path = `/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${settings.geoCoordAndWeather['apiKey']}`
            return await this.fabric(path)()
        },
  
        async getData({hostname, port, path, method}){

           var options = {
            hostname,
            port,
            path, 
            method,
            headers: {
              'Content-Type':  'application/json', 
              //'Content-Length': data.length
            },
          };
    
          console.log(`PATH \n`, options.hostname, options.path)
    
        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
              
              var responseBody = '';
        
              res.on('data', (chunk) => {
                responseBody += chunk;
              });
        
              res.on('end', () => {
                resolve({status: 'ok', data: responseBody});
              });
            });
        
            req.on('error', (err) => {
              reject(err);
            });
        
           // req.write(data)
            req.end();
          });
    },
  }
}

module.exports = CityCoordAndWeather