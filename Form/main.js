const fileList = [];
const fileSelector = document.getElementById('files');
const files = fileSelector.files;
const $form = document.querySelector("form");


const ajax = (options) => {
    let { url, method, success, error, data } = options;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", e => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
          let json = JSON.parse(xhr.responseText);
          success(json);
        } else {
          let message = xhr.statusText || "Error";
          error(`Error ${xhr.status}: ${message}`);
        }
      });

      xhr.open(method || "GET", url);
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.send(JSON.stringify(data));
    }

    const getAll = () => {
        ajax({
          url: "http://localhost:3000/vehiculos",
          success: (res) => {console.log(res)},
          error: (err) => {console.log(err)},
    })
}


document.addEventListener("DOMContentLoaded", getAll);

fileSelector.addEventListener('change', (e) => {
    const fileList = e.target.files;
    console.log(fileList);
  }); 
 
document.addEventListener("submit", e => {
    if (e.target === $form) {
      e.preventDefault();
        const imgList = [e.target.files.value];
         for(var i = 0; i < files.length; i++) {
             var file = files[i];
             if (!file.type.match('image.*')) {
             }
			$form.append('fileList[]', file, imgList);
		}
        fileList.push(files);
     

      if (!e.target.id.value) {
        ajax({
          url: "http://localhost:3000/vehiculos",
          method: "POST",
          success: (res) => console.log(res),
          error: (err) => console.log(err),
          data: {
            vType: e.target.vType.value,
            brand: e.target.brand.value,
            model: e.target.model.value,
            image: fileList
          }
        });
        }
    }
});
