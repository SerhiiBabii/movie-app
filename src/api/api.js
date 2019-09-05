export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "b1a938ee7f324798663cd0727c5783ee";

export const API_KEY_4 =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWE5MzhlZTdmMzI0Nzk4NjYzY2QwNzI3YzU3ODNlZSIsInN1YiI6IjVkNjNmMzQ1YmM4YWJjNjA1ZDI1MDY5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0AmtMmTcqQ9lyLuhMfOXywHfhxLQ8NH110DBfcawH4c";

export const fetchApi = (url, option = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, option)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(response => {
        response.json().then(error => {
          reject(error);
        });
      });
  });
};
