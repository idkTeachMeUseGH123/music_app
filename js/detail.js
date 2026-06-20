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

}else if(product.type === "artist"){
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

}else if(product.type === "album"){
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
}