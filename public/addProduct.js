document.addEventListener('DOMContentLoaded', function() {
    console.log("ONLOAD CALLBACK")
    const form = document.getElementById("uploadForm");

    form.addEventListener("submit", submitForm);
    
    function submitForm(e) {
        e.preventDefault();
        const title = document.getElementById("title");
        const price = document.getElementById("price");
        const category = document.getElementById("category");
        const files = document.getElementById("imageFile");
        console.log("files")
        console.log(files)
        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("price", price.value);
        formData.append("category", category.value);
        for(let i =0; i < files.files.length; i++) {
            console.log("PRIVIT")
                formData.append("files", files.files[i]);
        }
        const full = location.protocol + '//' + location.host;
        fetch(`${full}/add`, {
            method: 'POST',
            body: formData,
            headers: {
            //   "Content-Type": "multipart/form-data"
            }
        })
            .then((res) => console.log(res))
            .catch((err) => ("Error occured", err));
    }
  });