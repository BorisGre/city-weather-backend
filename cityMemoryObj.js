var memoryObj = () => {
   
   return {
     cachedReq: {
         cityName: {'coord': {'lon': '', 'lat': ''}}
     },
     put(cityName, {lat, lon}){ 
         console.log(`Memory Cache WRITE`, this, cityName, lat, lon)
         this.cachedReq[cityName] = {coord: {lat, lon}}
     },
     get(request){    
        console.log(`Memory Cache READ`, this, request)
        var preAns = this.cachedReq[request] || {}
        var status = Object.keys(preAns).length < 1 ? 'noEntry' : 'ok'
        var out =  {status, data: preAns}  
             console.log(`MEMORY GET`, out)                                              
        return out                                                         
     },
     cleanOne(request){
         delete this.cachedReq[request]
     },
     cleanAll(){
        this.cachedReq = {'cityName': { 'coord': {'lon': '', 'lat': ''}}}
     }, 
    }
}

module.exports = memoryObj