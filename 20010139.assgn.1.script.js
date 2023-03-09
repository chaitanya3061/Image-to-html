// Cache DOM elements
const fileInput = document.querySelector('.js-file');
const container = document.querySelector('.container');
const sizeInput = document.querySelector('#size');

function image() {
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      // create invisible canvas to access image data
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      // store entire rgba contents as a single array
      const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
      const size = sizeInput.value;
      let str = "";
      // populating rgba values
      for (let i = 0; i < imageData.length; i += 4) {
        let r = imageData[i];
        let g = imageData[i + 1];
        let b = imageData[i + 2];
        let a = imageData[i + 3] / 255;
        const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;
        str += `<div height='${size}' width='${size}' style='background: ${rgba};'></div>`;
    
      }
      // update container element with generated table
      container.innerHTML = str;
      // append a textarea with the generated HTML code
      const textArea = `<textarea class='text' rows='10' readonly>${str}</textarea>`;
      container.insertAdjacentHTML('beforeend', textArea);
    }
    // decode the data URL and load the image
    img.src = event.target.result;
  }
  reader.readAsDataURL(fileInput.files[0]);
}

// Attach the image function to both the file input and convert button
fileInput.addEventListener('change', image);
const convertButton = document.querySelector('.js-convert-button');
convertButton.addEventListener('click', image);
