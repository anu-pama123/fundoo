import axiosfile from './axiosservice';

let obj = new new axiosfile();
baseurl =  "http://fundoonotes.incubation.bridgelabz.com/api/";
class userservice {
    registraion = () => {
        return obj.postMethod(`${baseurl}user/userSignUp`);
    }
    signin = () => {
        return obj.postMethod(`${baseurl}user/userSignUp`,data, headers);
    }
    reset = () => {
        
    }
}