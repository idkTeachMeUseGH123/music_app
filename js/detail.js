const url = "https://6a1160413e35d0f37ee33624.mockapi.io/music_album";
const data = localStorage.getItem("choosedProduct");
const product = JSON.parse(data);

if (product.type === "song") {
    const productGrid = document.querySelector('.detail-hero-inner');
    const image = `
        <img id="detail-cover" class="detail-cover" src="${product.image}" alt="Cover">
        <div class="detail-meta">
            <span id="detail-type-badge" class="detail-type-badge">${product.artist}</span>
            <h2 id="detail-title" class="detail-title">${product.title}</h2>
            <p id="detail-subtitle" class="detail-subtitle">${product.duration}</p>
        </div>
    `;
    productGrid.innerHTML = image;

    const detailGrid = document.querySelector('.detail-info-grid');
    const detail = `
            <div class="detail-info-card">
                <p class="info-label">Album</p>
                <p id="detail-album" class="info-value">${product.album}</p>
            </div>
            <div class="detail-info-card">
                <p class="info-label">Release Date</p>
                <p id="detail-release-date" class="info-value">${product.date}</p>
            </div>
    `;
    detailGrid.innerHTML = detail;

    const descriptionGrid = document.querySelector('.detail-description-block');
    const description = `
            <h4>Description</h4>
            <p id="detail-description">${product.description}</p>
    `;
    descriptionGrid.innerHTML = description;

    document.querySelector(".section-header").innerHTML += `
            <h3>Related to this song</h3>
        `;

    renderRelated();

} else if (product.type === "artist") {
    const productGrid = document.querySelector('.detail-hero-inner');
    const image = `
        <img id="detail-cover" class="detail-cover" src="${product.image}" alt="Cover">
        <div class="detail-meta">
            <h2 id="detail-title" class="detail-title">${product.artist}</h2>
            <p id="detail-subtitle" class="detail-subtitle">${product.date}</p>
        </div>
    `;
    productGrid.innerHTML = image;

    const descriptionGrid = document.querySelector('.detail-description-block');
    const description = `
            <h4>Description</h4>
            <p id="detail-description">${product.description}</p>
    `;
    descriptionGrid.innerHTML = description;

    document.querySelector(".section-header").innerHTML += `
            <h3>Related to this artist</h3>
        `;

    renderRelated();

} else if (product.type === "album") {
    const productGrid = document.querySelector('.detail-hero-inner');
    const image = `
        <img id="detail-cover" class="detail-cover" src="${product.image}" alt="Cover">
        <div class="detail-meta">
            <span id="detail-type-badge" class="detail-type-badge">${product.artist}</span>
            <h2 id="detail-title" class="detail-title">${product.title}</h2>
            <p id="detail-subtitle" class="detail-subtitle">${product.duration}</p>
        </div>
    `;
    productGrid.innerHTML = image;

    const detailGrid = document.querySelector('.detail-info-grid');
    const detail = `
            <div class="detail-info-card">
                <p class="info-label">Release Date</p>
                <p id="detail-release-date" class="info-value">${product.date}</p>
            </div>
    `;
    detailGrid.innerHTML = detail;

    const descriptionGrid = document.querySelector('.detail-description-block');
    const description = `
            <h4>Description</h4>
            <p id="detail-description">${product.description}</p>
    `;
    descriptionGrid.innerHTML = description;

    document.querySelector(".section-header").innerHTML += `
            <h3>Related to this album</h3>
        `;

    renderRelated();
}

// Tách "ft.", "feat.", "featuring", dấu phẩy, "&", "x"
function getMainArtist(artistString) {
    if (!artistString) return "";
    return artistString
        .split(/ft\.|feat\.|featuring|,|&|\sx\s/i)[0]
        .trim()
        .toLowerCase();
}

function renderRelated() {
    fetch(url)
        .then(res => res.json())
        .then(data => {

            const mainArtist = getMainArtist(product.artist);

            const related = data.filter(item => {
                return getMainArtist(item.artist) === mainArtist &&
                    item.id !== product.id &&
                    (item.type === "song" || item.type === "album" || item.type === "artist");
            });

            // Sắp xếp theo thứ tự: song - album - artist
            const typeOrder = { song: 1, album: 2, artist: 3 };
            related.sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);

            const relatedGrid = document.querySelector(".album-grid");
            relatedGrid.innerHTML = "";

            related.forEach(item => {
                if (item.type === "artist") {
                    relatedGrid.innerHTML += `
                        <div class="album-card" onclick="getProductById('${item.id}')">
                            <img src="${item.image}">
                            <p class="album-title">${item.artist}</p>
                        </div>
                    `;
                } else {
                    relatedGrid.innerHTML += `
                        <div class="album-card" onclick="getProductById('${item.id}')">
                            <img src="${item.image}" alt="${item.title}">
                            <p class="album-title">${item.title}</p>
                            <p class="album-artist">${item.artist}</p>
                        </div>
                    `;
                }
            });

        })
        .catch(error => console.error(error));
}

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

//LỖI LINK YT =(
// var isPlaying = false;

// function updatePlayIcon() {
//     const icon = document.getElementById("play-icon");
//     if (!icon) return;

//     icon.classList.toggle("fa-play", !isPlaying);
//     icon.classList.toggle("fa-pause", isPlaying);
// }

// function getYoutubeId(url) {
//     if (!url) return null;
//     const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
// }


// function getOrCreateAudioFrame() {
//     let audioFrame = document.getElementById("audio-player-frame");

//     if (!audioFrame) {
//         audioFrame = document.createElement("iframe");
//         audioFrame.id = "audio-player-frame";
//         // audioFrame.style.display = "none";
//         audioFrame.style.width = "560px";
//         audioFrame.style.height = "315px";
//         audioFrame.style.position = "fixed";
//         audioFrame.style.right = "20px";
//         audioFrame.style.bottom = "20px";
//         audioFrame.style.zIndex = "9999";
//         audioFrame.allow = "autoplay; encrypted-media";
//         audioFrame.setAttribute("frameborder", "0");
//         document.body.appendChild(audioFrame);
//     }

//     return audioFrame;
// }

// // function playSong() {
// //     const videoId = getYoutubeId(product.url);

// //     if (!videoId) {
// //         alert("Song not found");
// //         return;
// //     }

// //     const audioFrame = getOrCreateAudioFrame();
// //     audioFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

// //     isPlaying = true;
// //     updatePlayIcon();
// // }
// function playSong() {
//     const videoId = getYoutubeId(product.url);

//     const audioFrame = getOrCreateAudioFrame();

//     audioFrame.src =
//         `https://www.youtube.com/embed/${videoId}?autoplay=1`;

//     console.log(audioFrame.src);
// }

// function pauseSong() {
//     const audioFrame = document.getElementById("audio-player-frame");
//     if (audioFrame) audioFrame.src = "";

//     isPlaying = false;
//     updatePlayIcon();
// }

// function playBtn() {
//     if (product.type !== "song") {
//         window.open(product.url, "_blank");
//         return;
//     }

//     if (isPlaying) {
//         pauseSong();
//     } else {
//         playSong();
//     }
// }
function playBtn() {
    window.open(product.url, "_blank");
}