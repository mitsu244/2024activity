document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(uploadForm);

            console.log('Form data:', formData);

            try {
                const response = await fetch('http://127.0.0.1:3000/api/artworks', {
                    method: 'POST',
                    body: formData
                });

                console.log('Response status:', response.status);
                console.log('Response ok:', response.ok);

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Response data:', responseData);
                    alert('作品上传成功!');
                    uploadForm.reset();
                } else {
                    const errorText = await response.text();
                    console.error('Error response:', errorText);
                    alert('作品上传失败! ' + errorText);
                }
            } catch (error) {
                console.error('Network error:', error);
                alert('网络错误! ' + error.message);
            }
        });
    }

    const artworkList = document.getElementById('artwork-list');
    if (artworkList) {
        fetch('http://127.0.0.1:3000/api/artworks')
            .then(response => response.json())
            .then(data => {
                data.forEach(artwork => {
                    const artworkItem = document.createElement('div');
                    artworkItem.className = 'artwork-item';
                    artworkItem.innerHTML = `
                        <h3>${artwork.title}</h3>
                        <p>创作人: ${artwork.author}</p>
                        <p>介绍: ${artwork.description}</p>
                        <img src="/uploads/${artwork.image}" alt="${artwork.title}">
                        <a href="rate.html?id=${artwork._id}">给作品评分</a>
                    `;
                    artworkList.appendChild(artworkItem);
                });
            })
            .catch(error => {
                console.error('Error fetching artworks:', error);
                alert('加载作品列表时出错! ' + error.message);
            });
    }
});
