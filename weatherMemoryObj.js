var memoryObj = (settings) => {

     return {
       cachedReq: {
           cityName: {'weather': {'current': { date: '', data: {} }, 'forecast': {date: '', data: {} }}}
       },
       put(cityName, period, data){ 
           console.log(`Memory Cache WRITE`, this, cityName, `\n${period}\n`, data)
           this.cachedReq[cityName] = {'weather': {}}
           this.cachedReq[cityName]['weather'][period] = {date: (new Date).getTime(), data}
       },
       get(cityName, cityCoord, period){    
          console.log(`Memory Cache READ`, this, cityName, period)
          var city = this.cachedReq[cityName] || {}

          if(Object.keys(city).length < 1) return {status: 'noEntry',  data: {}}

          var weather = period === 'all' ? city['weather'] : city['weather'][period] 

          //console.log(`preAns`, preAns)
          var cacheInvalidationDiffTime = settings.cacheRecordLifeTime*100//convert second to ms
          var out = {status: 'ok', data: 
                        {period: 
                            Object.keys(weather).map(k => {
                                console.log(`MEMORY READ weather\n`, weather, city, `cache\n`, this.cachedReq)
                              return {status: (new Date).getTime() - weather[k].date >= 
                                               cacheInvalidationDiffTime ? 'entryExpired': 'ok',
                                      k: weather[k]        
                            }})
                        }   
                    } 
               console.log(`MEMORY GET`, out)                                              
          return out                                                         
       },
       cleanOne(key){
           delete this.cachedReq[key]
       },
       cleanAll(){
          this.cachedReq = {cityName: {'weather': {'current': { date, data }, 'forecast': {date, data }}}}
       }, 
      }
  }
  
  module.exports = memoryObj