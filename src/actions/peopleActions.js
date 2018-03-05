import axios from "axios";

const API_ROOT = "http://swapi.co";

export const getPeople = () => {
  const url = `${API_ROOT}/people`;

  axios.get(url).then(response => {
      console.log("Gotg people data," JSON.stringify(response));
      
  }).catch(err => {
      console.log(err);
  });
};

export const getPerson = (id) => {
    const url = `${API_ROOT}/people/${id}`;

    axios.get(url).then(response => {
        console.log("Got person w/ id:", id, " ", JSON.stringify(response));
        
    }).catch(err => {
        console.log(err);
    });
}

