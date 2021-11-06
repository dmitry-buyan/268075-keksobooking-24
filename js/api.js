const Urls = {
  LOAD: 'https://24.javascript.pages.academy/keksobooking/data',
  UPLOAD: 'https://24.javascript.pages.academy/keksobooking',
};

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
};

const getData = (onLoad, onError) => {
  fetch(Urls.LOAD)
    .then((response) => response.json())
    .then((pins) => onLoad(pins))
    .catch((err) => onError(err));
};

const sendData = (onUpload, onError, data) => {
  fetch(Urls.UPLOAD,
    {
      method: HttpMethods.POST,
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onUpload();
      } else {
        onError('Не удалось отправить данные');
      }
    })
    .catch((err) => onError(err));
};

export { getData, sendData };
