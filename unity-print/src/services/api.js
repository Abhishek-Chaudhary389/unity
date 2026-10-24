// API Service connecting React frontend to Node.js/Express & MongoDB backend

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Helper to get auth header with Bearer JWT token
const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken')
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    return headers
}

// ================= 1. PRODUCTS API =================
export async function getProductsAPI(params = {}) {
    try {
        const query = new URLSearchParams(params).toString()
        const res = await fetch(`${API_BASE}/products${query ? `?${query}` : ''}`)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        return data.data
    } catch (err) {
        console.warn('Backend products API unreachable, using local fallback:', err.message)
        return null
    }
}

export async function createProductAPI(productData) {
    const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to create product')
    return data.data
}

export async function updateProductAPI(id, productData) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to update product')
    return data.data
}

export async function deleteProductAPI(id) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to delete product')
    return true
}

// ================= 2. GALLERY API =================
export async function getGalleryAPI(category) {
    try {
        const url = category && category !== 'all' ? `${API_BASE}/gallery?category=${category}` : `${API_BASE}/gallery`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        return data.data
    } catch (err) {
        console.warn('Backend gallery API unreachable, using local fallback:', err.message)
        return null
    }
}

export async function createGalleryPhotoAPI(photoData) {
    const res = await fetch(`${API_BASE}/gallery`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(photoData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to add gallery photo')
    return data.data
}

export async function deleteGalleryPhotoAPI(id) {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to delete gallery photo')
    return true
}

// ================= 3. CLIENTS API =================
export async function getClientsAPI(category) {
    try {
        const url = category && category !== 'all' ? `${API_BASE}/clients?category=${category}` : `${API_BASE}/clients`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        return data.data
    } catch (err) {
        console.warn('Backend clients API unreachable, using local fallback:', err.message)
        return null
    }
}

export async function createClientAPI(clientData) {
    const res = await fetch(`${API_BASE}/clients`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(clientData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to add client')
    return data.data
}

export async function updateClientAPI(id, clientData) {
    const res = await fetch(`${API_BASE}/clients/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(clientData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to update client')
    return data.data
}

export async function deleteClientAPI(id) {
    const res = await fetch(`${API_BASE}/clients/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to delete client')
    return true
}

// ================= 4. ENQUIRIES / ORDERS API =================
export async function submitEnquiryAPI(formData) {
    const res = await fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to submit enquiry')
    return data
}

export async function getEnquiriesAPI(status) {
    const url = status && status !== 'all' ? `${API_BASE}/enquiries?status=${status}` : `${API_BASE}/enquiries`
    const res = await fetch(url, {
        headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch enquiries')
    return data.data
}

export async function updateEnquiryStatusAPI(id, updateData) {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to update enquiry')
    return data.data
}

export async function deleteEnquiryAPI(id) {
    const res = await fetch(`${API_BASE}/enquiries/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to delete enquiry')
    return true
}

// ================= 5. AUTH API =================
export async function loginAdminAPI(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Invalid credentials')
    if (data.token) {
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem('adminUser', JSON.stringify(data.admin))
    }
    return data
}

export async function getMeAPI() {
    const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Session expired')
    return data.admin
}

export function logoutAdmin() {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
}

// ================= 6. IMAGE UPLOAD API =================
export async function uploadImageAPI(fileOrBase64, customFileName = '') {
    const token = localStorage.getItem('adminToken')
    const headers = {}
    if (token) headers['Authorization'] = `Bearer ${token}`

    // Support Base64 string direct upload to ImageKit Cloud
    if (typeof fileOrBase64 === 'string' && fileOrBase64.startsWith('data:image/')) {
        const res = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imageBase64: fileOrBase64,
                fileName: customFileName || `upload_${Date.now()}.jpg`
            })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to upload image to ImageKit')
        return data.url
    }

    // Multipart file upload
    const formData = new FormData()
    formData.append('image', fileOrBase64)

    const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers,
        body: formData
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to upload image')
    return data.url
}

// Check Backend Health
export async function checkBackendHealth() {
    try {
        const res = await fetch(`${API_BASE}/health`)
        return await res.json()
    } catch (e) {
        return { success: false, databaseConnected: false, error: e.message }
    }
}
