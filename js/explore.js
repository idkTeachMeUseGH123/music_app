const url = "https://6a1160413e35d0f37ee33624.mockapi.io/music_album"

fetch(url)
    // Chuyển từ json qua object
    .then(res => res.json())
    .then(data => {
        let songs = data.filter(x => x.type === "song");
        let albums = data.filter(x => x.type === "album");
        let artists = data.filter(x => x.type === "artist");

        const artist = artists.splice(2, 8);
        const artistGrid = document.querySelector('#artist');
        artist.forEach(product => {
            const productCard = `
                <div class="album-card" onclick="getProductById('${product.id}')">
                    <img src="${product.image}">
                    <p class="album-title">${product.artist}</p>
                </div>          
            `;
            artistGrid.innerHTML += productCard;
        });

        const song = songs.splice(0, 6);
        const songGrid = document.querySelector('#song');
        song.forEach(product => {
            const productCard = `
                <div class="album-card" onclick="getProductById('${product.id}')">
                    <img src="${product.image}">
                    <p class="album-title">${product.title}</p>
                    <p class="album-artist">${product.artist}</p>
                </div>          
            `;
            songGrid.innerHTML += productCard;
        });

        const album = albums.splice(0, 6);
        const albumGrid = document.querySelector('#album');
        album.forEach(product => {
            const productCard = `
                <div class="album-card">
                    <img src="${product.image}" onclick="getProductById('${product.id}')">
                    <p class="album-title">${product.title}</p>
                    <p class="album-artist">${product.artist}</p>
                </div>          
            `;
            albumGrid.innerHTML += productCard;
        });
    })
    .catch(error => console.error('Error fetching data:', error));

function getProductById(id) {
    fetch(`${url}/${id}`)
        .then(res => res.json())
        .then(product => {
            console.log(product);
            localStorage.setItem("choosedProduct", JSON.stringify(product));
            location.href = "./detail.html";
        })
        .catch(error => console.error(error));
    }