const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
  const imgLink = URL.createObjectURL(inputFile.files[0]);
  imageView.style.backgroundImage = `url(${imgLink})`;
  imageView.textContent = "";
  imageView.style.border = 0;
}

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
})
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
})

document.addEventListener("paste", (e) => {
  const items = e.clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf("image") !== -1) {
      const blob = items[i].getAsFile();
      const imgLink = URL.createObjectURL(blob);
      imageView.style.backgroundImage = `url(${imgLink})`;
      imageView.textContent = "";
      imageView.style.border = 0;
      
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(blob);
      inputFile.files = dataTransfer.files;
    }
  }
});
