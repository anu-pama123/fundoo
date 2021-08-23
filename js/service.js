const baseurl = "http://fundoonotes.incubation.bridgelabz.com/api";
const headerconfig= {
    headers: { 'Content-Type': 'application/json', 
    Authorization: localStorage.getItem('token')
  }
};
export function deleteNote(data) {        
    return axios.post(`${baseurl}/notes/trashNotes`, data, headerconfig)
}