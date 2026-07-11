
const url = "https://6a1160413e35d0f37ee33624.mockapi.io/music_album";

fetch(url)
    .then(res => res.json())
    .then(data => {

        const charliePuth = data.find(item => item.artist === "Charlie Puth" && item.type === "artist");
        const wdta = data.find(item => item.title === "We Don't Talk Anymore" && item.type === "song");
        const taylorSwift = data.find(item => item.artist === "Taylor Swift" && item.type === "artist");

        const carouselData = [
            {
                item: charliePuth,
                tag: "Artist of the Day",
                title: "Charlie Puth:<br>Perfect Pitch Pop Sensation",
                desc: "Grammy-nominated singer, songwriter and producer known for his perfect pitch.",
                tagColor: "",
                btnColor: "",
                btnTextColor: "",
                detail: "View Profile"
            },
            {
                item: wdta,
                tag: "Best Song",
                title: "We Don't Talk Anymore",
                desc: "The smash hit featuring Selena Gomez — over 3 billion streams and counting worldwide.",
                tagColor: "#00bfff",
                btnColor: "#00bfff",
                btnTextColor: "#000",
                detail: "View Song"
            },
            {
                item: taylorSwift,
                tag: "Artist of the Year",
                title: "Taylor Swift:<br>The Eras Tour Icon",
                desc: "Record-breaking tours, 14 Grammys, and a cultural phenomenon that defined an era.",
                tagColor: "#FFD700",
                btnColor: "#FFD700",
                btnTextColor: "#000",
                detail: "View Profile"
            }
        ];

        const carouselInner = document.querySelector(".carousel-inner");
        carouselInner.innerHTML = "";

        carouselData.forEach((product, index) => {
            carouselInner.innerHTML += `
                <div class="carousel-item ${index === 0 ? "active" : ""}">
                    <div class="hero-slide">
                        <img src="${product.item.image}" alt="${product.item.artist}">
                        <div class="hero-overlay"></div>
                        <div class="hero-content">
                            <p class="hero-tag" ${product.tagColor ? `style="color:${product.tagColor}"` : ""}> ${product.tag} </p>
                            <h2 class="hero-title"> ${product.title} </h2>
                            <p class="hero-desc"> ${product.desc} </p>
                            <div class="hero-buttons">
                                <button class="btn-primary-custom" ${product.btnColor ? `style="background:${product.btnColor}; color:${product.btnTextColor}"` : ""} onclick="getProductById('${product.item.id}')"> Play Now </button>
                                <button class="btn-secondary-custom" onclick="getProductById('${product.item.id}')"> ${product.detail} </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // ===== Top Charts =====
        const list = data.splice(0, 3);
        const songGrid = document.querySelector(".song-list");

        let i = 1;

        list.forEach(product => {
            songGrid.innerHTML += `
                <div class="song-item" onclick="getProductById('${product.id}')">
                    <span class="song-rank">${i}</span>
                    <img src="${product.image}" alt="${product.title}">
                    <div class="song-info">
                        <p class="song-name">${product.title}</p>
                        <p class="song-artist">${product.artist}</p>
                    </div>
                    <span class="song-album">${product.album}</span>
                    <span class="song-time">${product.duration}</span>
                </div>
            `;
            i++;
        });

        // ===== New Releases =====
        const DataHome = data.splice(0, 7);
        const productGrid = document.querySelector(".album-grid");

        DataHome.forEach(product => {
            productGrid.innerHTML += `
                <div class="album-card" onclick="getProductById('${product.id}')">
                    <img src="${product.image}" alt="${product.title}">
                    <p class="album-title">${product.title}</p>
                    <p class="album-artist">${product.artist}</p>
                </div>
            `;
        });

    })
    .catch(error => console.error("Error fetching data:", error));

function getProductById(id) {
    fetch(`${url}/${id}`)
        .then(res => res.json())
        .then(product => {
            localStorage.setItem("choosedProduct", JSON.stringify(product));
            location.href = "./detail.html";
        })
        .catch(error => console.error(error));
}
