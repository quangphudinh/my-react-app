function showFileName() {
    const fileInput = document.getElementById('imageUpload');
    const fileName = document.getElementById('fileName');
    fileName.textContent = fileInput.files[0].name;
}

export default showFileName