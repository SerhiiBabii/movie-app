import queryString from "query-string";

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

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        }
      }
    );
  }
  static post(url, options = {}) {
    const { params = {}, body } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(body)
      }
    );
  }
  static mark(url, options = {}) {
    const { params = {}, body } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(body)
      }
    );
  }
  static delete(url, options = {}) {
    const { params = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-type": "application/json"
        }
      }
    );
  }
}
