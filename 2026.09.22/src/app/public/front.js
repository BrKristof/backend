// A szerver /products végpontjáról kéri le az adatokat fetch-el, és kártyákként jeleníti meg őket
const API_URL = "/products"

const listElement = document.getElementById("products")
const statusElement = document.getElementById("status")
const searchInput = document.getElementById("search")
const categorySelect = document.getElementById("category")
const editForm = document.getElementById("edit-form")
const productSelect = document.getElementById("product-select")
const formStatus = document.getElementById("form-status")
const saveButton = editForm.querySelector('button[type="submit"]')

let products = []

async function loadProducts() {
    statusElement.textContent = "Betöltés..."
    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error(`HTTP hiba: ${response.status}`)
        }
        products = await response.json() // json formátum szóval .json-el oldom fel
        fillCategories()
        fillProductSelect()
        render()
    } catch (error) {
        statusElement.textContent = `Nem sikerült betölteni az adatokat: ${error.message}`
    }
}

function fillCategories() {
    const selectedCategory = categorySelect.value
    const categories = [...new Set(products.map(p => p.category))]
    // a régi opciókat törlöm, hogy mentés után ne duplázódjanak (az első "Összes kategória" marad)
    categorySelect.length = 1
    for (const category of categories) {
        const option = document.createElement("option")
        option.value = category
        option.textContent = category
        categorySelect.appendChild(option)
    }
    categorySelect.value = categories.includes(selectedCategory) ? selectedCategory : ""
}

function formatPrice(price, currency) {
    return new Intl.NumberFormat("hu-HU", { style: "currency", currency, maximumFractionDigits: 0 }).format(price)
}

function render() {
    const search = searchInput.value.trim().toLowerCase()
    const category = categorySelect.value

    const filtered = products.filter(p =>
        (category === "" || p.category === category) &&
        (p.name.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search))
    )

    listElement.innerHTML = ""
    for (const p of filtered) {
        const card = document.createElement("article")
        card.className = "card"
        card.innerHTML = `
            <span class="category"></span>
            <h2></h2>
            <p class="brand"></p>
            <p class="description"></p>
            <div class="footer">
                <strong class="price"></strong>
                <span class="meta"></span>
            </div>
            <button type="button">Szerkesztés</button>
        `
        // textContent-et használok, hogy az adatokból ne kerülhessen HTML az oldalba
        card.querySelector(".category").textContent = p.category
        card.querySelector("h2").textContent = p.name
        card.querySelector(".brand").textContent = p.brand
        card.querySelector(".description").textContent = p.description
        card.querySelector(".price").textContent = formatPrice(p.price, p.currency)
        card.querySelector(".meta").textContent = `★ ${p.rating} · ${p.stock} db`
        card.querySelector("button").addEventListener("click", () => selectProduct(p.id))
        listElement.appendChild(card)
    }

    statusElement.textContent = `${filtered.length} / ${products.length} termék`
}

// ---------- Szerkesztő űrlap ----------

function fillProductSelect() {
    const selectedId = productSelect.value
    productSelect.length = 1 // az első "Válassz terméket..." opció marad
    for (const p of products) {
        const option = document.createElement("option")
        option.value = p.id
        option.textContent = `#${p.id} – ${p.name}`
        productSelect.appendChild(option)
    }
    productSelect.value = selectedId
}

function getSelectedProduct() {
    return products.find(p => p.id === Number(productSelect.value))
}

// a kiválasztott termék adatait beírja az űrlap mezőibe (null esetén kiüríti)
function fillForm(product) {
    const fields = editForm.elements
    fields.name.value = product?.name ?? ""
    fields.category.value = product?.category ?? ""
    fields.brand.value = product?.brand ?? ""
    fields.price.value = product?.price ?? ""
    fields.currency.value = product?.currency ?? "HUF"
    fields.stock.value = product?.stock ?? ""
    fields.rating.value = product?.rating ?? ""
    fields.image.value = product?.image ?? ""
    fields.active.checked = product?.active ?? false
    fields.description.value = product?.description ?? ""
    saveButton.disabled = !product
}

// az űrlap mezőiből összerakja a szervernek küldött objektumot, a számokat számmá alakítva
function readForm() {
    const fields = editForm.elements
    return {
        name: fields.name.value.trim(),
        category: fields.category.value.trim(),
        brand: fields.brand.value.trim(),
        price: Number(fields.price.value),
        currency: fields.currency.value,
        stock: Number(fields.stock.value),
        rating: Number(fields.rating.value),
        image: fields.image.value.trim(),
        active: fields.active.checked,
        description: fields.description.value.trim()
    }
}

function setFormStatus(text, type = "") {
    formStatus.textContent = text
    formStatus.className = type
}

function selectProduct(id) {
    productSelect.value = id
    fillForm(getSelectedProduct())
    setFormStatus("")
    editForm.scrollIntoView({ behavior: "smooth" })
}

async function saveProduct(event) {
    event.preventDefault() // ne küldje el a böngésző az űrlapot / ne töltse újra az oldalt
    const product = getSelectedProduct()
    if (!product) return

    saveButton.disabled = true
    setFormStatus("Mentés...")
    try {
        const response = await fetch(`${API_URL}/${product.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(readForm())
        })
        if (!response.ok) {
            throw new Error(`HTTP hiba: ${response.status}`)
        }
        const updated = await response.json()
        // a helyi listában is lecserélem a terméket a szervertől visszakapott változatra
        products = products.map(p => p.id === updated.id ? updated : p)
        fillCategories()
        fillProductSelect()
        render()
        setFormStatus("Sikeres mentés!", "success")
    } catch (error) {
        setFormStatus(`Nem sikerült menteni: ${error.message}`, "error")
    } finally {
        saveButton.disabled = false
    }
}

productSelect.addEventListener("change", () => {
    fillForm(getSelectedProduct())
    setFormStatus("")
})
editForm.addEventListener("submit", saveProduct)
// a "Visszaállítás" gomb a termék mentett adatait tölti vissza, nem üríti ki az űrlapot
editForm.addEventListener("reset", event => {
    event.preventDefault()
    fillForm(getSelectedProduct())
    setFormStatus("")
})

searchInput.addEventListener("input", render)
categorySelect.addEventListener("change", render)

fillForm(null)
loadProducts()
