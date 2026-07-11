const API_URL = "https://6a1160413e35d0f37ee33624.mockapi.io/music_album";

let allData = [];
let currentType = "song";
let pendingDeleteId = null;

// column 
const COLUMNS = {
    song: [
        { key: "image", label: "", isImage: true },
        { key: "title", label: "Title" },
        { key: "artist", label: "Artist" },
        { key: "album", label: "Album" },
        { key: "duration", label: "Duration" },
        { key: "date", label: "Release date" },
    ],
    artist: [
        { key: "image", label: "", isImage: true },
        { key: "artist", label: "Name" },
        { key: "description", label: "Description" },
        { key: "date", label: "Born" },
    ],
    album: [
        { key: "image", label: "", isImage: true },
        { key: "title", label: "Title" },
        { key: "artist", label: "Artist" },
        { key: "duration", label: "Duration" },
        { key: "date", label: "Release date" },
    ],
};

const PANEL_META = {
    song: { title: "Songs", subtitle: "Manage every track on the platform", addLabel: "Add song" },
    artist: { title: "Artists", subtitle: "Manage the artists featured on the platform", addLabel: "Add artist" },
    album: { title: "Albums", subtitle: "Manage every album on the platform", addLabel: "Add album" },
};

// ── elements ──
const tableHead = document.getElementById("table-head");
const tableBody = document.getElementById("table-body");
const emptyState = document.getElementById("empty-state");
const panelTitle = document.getElementById("panel-title");
const panelSubtitle = document.getElementById("panel-subtitle");
const addBtn = document.getElementById("add-btn");

const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const itemForm = document.getElementById("item-form");
const modalClose = document.getElementById("modal-close");
const cancelBtn = document.getElementById("cancel-btn");

const deleteOverlay = document.getElementById("delete-overlay");
const deleteClose = document.getElementById("delete-close");
const deleteCancel = document.getElementById("delete-cancel");
const deleteConfirm = document.getElementById("delete-confirm");

const rowTitle = document.getElementById("row-title");
const rowAlbum = document.getElementById("row-album");
const rowDuration = document.getElementById("row-duration");

const fieldId = document.getElementById("field-id");
const fieldType = document.getElementById("field-type");
const fieldTitle = document.getElementById("field-title");
const fieldArtist = document.getElementById("field-artist");
const fieldAlbum = document.getElementById("field-album");
const fieldImage = document.getElementById("field-image");
const fieldDate = document.getElementById("field-date");
const fieldDuration = document.getElementById("field-duration");
const fieldDescription = document.getElementById("field-description");
const fieldUrl = document.getElementById("field-url");

const toast = document.getElementById("toast");

// ── init ──
document.querySelectorAll(".admin-nav-link").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".admin-nav-link").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentType = btn.dataset.type;
        updatePanelHeader();
        renderTable();
    });
});

addBtn.addEventListener("click", () => openForm());
modalClose.addEventListener("click", closeForm);
cancelBtn.addEventListener("click", closeForm);
modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeForm(); });

deleteClose.addEventListener("click", closeDeleteModal);
deleteCancel.addEventListener("click", closeDeleteModal);
deleteOverlay.addEventListener("click", (e) => { if (e.target === deleteOverlay) closeDeleteModal(); });
deleteConfirm.addEventListener("click", confirmDelete);

itemForm.addEventListener("submit", handleSubmit);

fetchData();

// ── fetch ──
function fetchData() {
    tableBody.innerHTML = `<tr><td colspan="6" class="table-loading">Loading data...</td></tr>`;
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            allData = data;
            updatePanelHeader();
            renderTable();
        })
        .catch(err => {
            console.error(err);
            tableBody.innerHTML = `<tr><td colspan="6" class="table-loading">Failed to load data.</td></tr>`;
        });
}

function updatePanelHeader() {
    const meta = PANEL_META[currentType];
    panelTitle.textContent = meta.title;
    panelSubtitle.textContent = meta.subtitle;
    addBtn.innerHTML = `<i class="fa-solid fa-plus"></i> ${meta.addLabel}`;
}

// ── render table ──
function renderTable() {
    const cols = COLUMNS[currentType];

    tableHead.innerHTML = `<tr>${cols.map(c => `<th>${c.label}</th>`).join("")}<th style="text-align:right">Actions</th></tr>`;

    let items = allData.filter(item => item.type === currentType);

    if (items.length === 0) {
        tableBody.innerHTML = "";
        emptyState.style.display = "block";
        return;
    }
    emptyState.style.display = "none";

    tableBody.innerHTML = items.map(item => {
        const cells = cols.map(c => {
            if (c.isImage) {
                return `<td><img class="row-thumb" src="${item.image || ''}" alt="" onerror="this.style.visibility='hidden'"></td>`;
            }
            const val = item[c.key] || "—";
            const cls = (c.key === "title" || c.key === "artist") ? "row-title" : "row-sub";
            return `<td class="${cls}">${escapeHtml(val)}</td>`;
        }).join("");

        return `
            <tr>
                ${cells}
                <td>
                    <div class="row-actions">
                        <button class="icon-btn" onclick="openForm('${item.id}')" title="Edit">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="icon-btn danger" onclick="openDeleteModal('${item.id}')" title="Delete">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// ── form ──
function openForm(id) {
    itemForm.reset();
    fieldType.value = currentType;

    // thêm trường cho loại item
    const isArtist = currentType === "artist";
    rowTitle.style.display = isArtist ? "none" : "flex";
    rowAlbum.style.display = currentType === "song" ? "flex" : "none";
    rowDuration.style.display = isArtist ? "none" : "flex";
    fieldTitle.required = !isArtist;

    if (id) {
        const item = allData.find(i => i.id === id);
        if (!item) return;
        modalTitle.textContent = `Edit ${currentType}`;
        fieldId.value = item.id;
        fieldTitle.value = item.title || "";
        fieldArtist.value = item.artist || "";
        fieldAlbum.value = item.album || "";
        fieldImage.value = item.image || "";
        fieldDate.value = item.date || "";
        fieldDuration.value = item.duration || "";
        fieldDescription.value = item.description || "";
        fieldUrl.value = item.url || "";
    } else {
        modalTitle.textContent = `Add ${currentType}`;
        fieldId.value = "";
    }

    modalOverlay.classList.add("show");
}

function closeForm() {
    modalOverlay.classList.remove("show");
}

function handleSubmit(e) {
    e.preventDefault();

    if (!fieldArtist.value.trim()) {
        return;
    }
    if (fieldTitle.required && !fieldTitle.value.trim()) {
        return;
    }

    const payload = {
        type: currentType,
        title: currentType === "artist" ? "" : fieldTitle.value.trim(),
        artist: fieldArtist.value.trim(),
        album: currentType === "song" ? fieldAlbum.value.trim() : "",
        image: fieldImage.value.trim(),
        date: fieldDate.value.trim(),
        duration: currentType === "artist" ? "" : fieldDuration.value.trim(),
        description: fieldDescription.value.trim(),
        url: fieldUrl.value.trim(),
    };

    const id = fieldId.value;
    const saveBtn = document.getElementById("save-btn");
    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";

    const request = id
        ? fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
        : fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

    request
        .then(res => {
            if (!res.ok) throw new Error("Request failed");
            return res.json();
        })
        .then(saved => {
            if (id) {
                allData = allData.map(i => (i.id === id ? saved : i));
            } else {
                allData.push(saved);
            }
            closeForm();
            renderTable();
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            saveBtn.disabled = false;
            saveBtn.textContent = "Save";
        });
}

// ── delete ──
function openDeleteModal(id) {
    pendingDeleteId = id;
    deleteOverlay.classList.add("show");
}

function closeDeleteModal() {
    pendingDeleteId = null;
    deleteOverlay.classList.remove("show");
}

function confirmDelete() {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;

    deleteConfirm.disabled = true;
    // deleteConfirm.textContent = "Deleting...";

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) throw new Error("Request failed");
            allData = allData.filter(i => i.id !== id);
            closeDeleteModal();
            renderTable();
            // showToast("Item deleted.");
        })
        .catch(err => {
            console.error(err);
            // showToast("Failed to delete item.", true);
        })
        .finally(() => {
            deleteConfirm.disabled = false;
            deleteConfirm.textContent = "Delete";
        });
}
