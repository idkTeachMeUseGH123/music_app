// const url = "https://6a1160413e35d0f37ee33624.mockapi.io/music_album"

// fetch(url)
//     // Chuyển từ json qua object
//     .then(res => res.json())
//     .then(data => {
//         const list = data.splice(0, 3);
//         const songGrid = document.querySelector('.song-list');
//         let i = 1;
//         list.forEach(product => {
//             const productCard = `
//                 <div class="song-item" onclick="getProductById('${product.id}')">
//                     <span class="song-rank">${i}</span>
//                     <img src="${product.image}">
//                     <div class="song-info">
//                         <p class="song-name">${product.title}</p>
//                         <p class="song-artist">${product.artist}</p>
//                     </div>
//                     <span class="song-album">${product.album}</span>
//                     <span class="song-time">${product.duration}</span>
//                 </div>         
//             `;
//             i++;
//             songGrid.innerHTML += productCard;
//         });

//         const DataHome = data.splice(0, 7);
//         const productGrid = document.querySelector('.album-grid');
//         DataHome.forEach(product => {
//             const productCard = `
//                 <div class="album-card" onclick="getProductById('${product.id}')">
//                     <img src="${product.image}">
//                     <p class="album-title">${product.title}</p>
//                     <p class="album-artist">${product.artist}</p>
//                 </div>          
//             `;
//             productGrid.innerHTML += productCard;
//         });
        
//         const carouselButtons = document.querySelectorAll('.carousel-btn-detail');
//         const carouselIds = [allData[0].id, allData[1].id, allData[2].id];
//         carouselButtons.forEach((btn, index) => {
//             btn.setAttribute('onclick', `getProductById('${carouselIds[index]}')`);
//         });

//     })
//     .catch(error => console.error('Error fetching data:', error));

// window.getProductById = function getProductById(id) {
//     fetch(`${url}/${id}`)
//         .then(res => res.json())
//         .then(product => {
//             console.log(product);
//             localStorage.setItem("choosedProduct", JSON.stringify(product));
//             location.href = "./detail.html";
//         })
//         .catch(error => console.error(error));

//     }
const url = "https://6a1160413e35d0f37ee33624.mockapi.io/music_album"

fetch(url)
    .then(res => res.json())
    .then(data => {
        // const allData = [...data];

        // const charliePuth  = allData.find(p => p.artist === "Charlie Puth" && p.type === "artist");
        // const wdta         = allData.find(p => p.title === "We Don't Talk Anymore" && p.type === "song");
        // const taylorSwift  = allData.find(p => p.artist === "Taylor Swift" && p.type === "artist");

        // const carouselIds = [charliePuth?.id, wdta?.id, taylorSwift?.id];

        // const carouselButtons = document.querySelectorAll('.carousel-btn-play');
        // carouselButtons.forEach((btn, index) => {
        //     if (carouselIds[index]) {
        //         btn.setAttribute('onclick', `getProductById('${carouselIds[index]}')`);
        //     }
        // });

        const list = data.splice(0, 3);
        const songGrid = document.querySelector('.song-list');
        let i = 1;
        list.forEach(product => {
            const productCard = `
                <div class="song-item" onclick="getProductById('${product.id}')">
                    <span class="song-rank">${i}</span>
                    <img src="${product.image}">
                    <div class="song-info">
                        <p class="song-name">${product.title}</p>
                        <p class="song-artist">${product.artist}</p>
                    </div>
                    <span class="song-album">${product.album}</span>
                    <span class="song-time">${product.duration}</span>
                </div>         
            `;
            i++;
            songGrid.innerHTML += productCard;
        });

        const DataHome = data.splice(0, 7);
        const productGrid = document.querySelector('.album-grid');
        DataHome.forEach(product => {
            const productCard = `
                <div class="album-card" onclick="getProductById('${product.id}')">
                    <img src="${product.image}">
                    <p class="album-title">${product.title}</p>
                    <p class="album-artist">${product.artist}</p>
                </div>          
            `;
            productGrid.innerHTML += productCard;
        });

    })
    .catch(error => console.error('Error fetching data:', error));

function getProductById(id) {
    fetch(`${url}/${id}`)
        .then(res => res.json())
        .then(product => {
            localStorage.setItem("choosedProduct", JSON.stringify(product));
            location.href = "./detail.html";
        })
        .catch(error => console.error(error));
}