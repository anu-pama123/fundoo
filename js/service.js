const baseurl = "http://fundoonotes.incubation.bridgelabz.com/api";

function getService(url, headerconfig) {   

    console.log(url, headerconfig);
    return new Promise (function(resolve, reject) {
      var resolved = axios.get(baseurl + url, headerconfig);
      resolve(resolved);
    })
    
}

function postService(url, data, headerconfig) {   

  console.log(url,data, headerconfig);
  return new Promise (function(resolve, reject) {
    var resolved = axios.post(baseurl + url, data, headerconfig);
    resolve(resolved);
  })

}


