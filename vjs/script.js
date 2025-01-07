document.getElementById('myButton').addEventListener('click', function() {
    alert('Button clicked!');
    // document.querySelector('h1').style.color = 'red';
});

document.getElementById('videoInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = URL.createObjectURL(file);
        videoPlayer.style.display = 'block';
        const uploadButton = document.getElementById('uploadButton');
    }
});

document.getElementById('uploadButton').addEventListener('click', function() {
    const file = document.getElementById('videoInput').files[0];
    if (file) {
        const formData = new FormData();
        formData.append('video', file);

        fetch('http://<SERVER_IP>:<PORT>/upload', { // Replace <SERVER_IP> and <PORT> with your server's IP and port
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Upload successful!');
        })
        .catch(error => {
            alert('Upload failed!');
        });
    } else {
        console.log('No file to upload.');
    }
});
