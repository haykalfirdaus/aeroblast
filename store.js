// DATA & LOGIC STORE AEROBLAST
const rankData = {
    aviator: { name: "AVIATOR", price: "15.000", cls: "color-aviator", feats: ["Home limit 5", "Warp create limit 5", "/ec & /wb", "1 VIP Key", "1 Legend Key", "1 Aerospace Key", "Aviator kits"] },
    exostic: { name: "EXOSTIC", price: "30.000", cls: "color-exostic", feats: ["Home limit 10", "Warp create limit 10", "/ec, /wb, /feed", "/recipe, /repair", "/stonecutter", "5 VIP Key", "3 Legend Key", "1 Aerospace Key", "EXOSTIC kits"] },
    force: { name: "FORCE", price: "50.000", cls: "color-force", feats: ["Home limit 20", "Warp create limit 20", "/ec, /wb, /feed", "/repair, /stonecutter", "/pweather, /ptime, /anvil", "10 VIP Key", "5 Legend Key", "2 Aerospace Key", "FORCE kits"] },
    xerelion: { name: "XERELION", price: "75.000", cls: "color-xerelion", feats: ["Home limit 50", "Warp create limit 50", "/ec, /wb, /feed, /repair", "/pweather, /ptime, /anvil", "/fly, /heal, /hat, /nick", "/msgtoggle", "15 VIP Key", "10 Legend Key", "2 Aerospace Key", "XERELION kits"] },
    galatics: { name: "GALATICS", price: "100.000", cls: "color-galatics", feats: ["Home unlimited", "Warp unlimited", "/ec, /wb, /feed, /repair", "/pweather, /ptime, /anvil", "/fly, /heal, /hat, /nick", "/tptoggle, /godmode", "18 VIP Key", "12 Legend Key", "3 Aerospace Key", "GALATICS kits"] }
};

const keyData = {
    basic: { name: "BASIC KEY", price: "1.000", desc: "Kunci standar untuk memulai petualanganmu!" },
    vote: { name: "VOTE KEY", price: "2.000", desc: "Dapatkan item menarik hanya dengan mendukung server!" },
    vip: { name: "VIP KEY", price: "4.000", desc: "Dapatkan tools dan armor yang lebih kuat!" },
    legend: { name: "LEGEND KEY", price: "8.000", desc: "Dapatkan hadiah legendaris dengan kekuatan menarik!" },
    aerospace: { name: "AEROSPACE KEY", price: "12.000", desc: "Dapatkan item langka dan kekuatan super besar!" }
};

let activeProduct = null;
let selectedPayment = "";

function switchTab(id, btn) {
    document.querySelectorAll('.store-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
}

// Render Ranks
const rGrid = document.getElementById('rankGrid');
if(rGrid) {
    Object.keys(rankData).forEach(k => {
        const r = rankData[k];
        rGrid.innerHTML += `
            <div class="item-card">
                <div class="item-name ${r.cls}">${r.name}</div>
                <div class="price">Rp ${r.price}</div>
                <div class="feat-list">${r.feats.map(f => `<div>${f}</div>`).join('')}</div>
                <button class="buy-btn" onclick="openCheckout('rank', '${k}')">BELI SEKARANG</button>
            </div>`;
    });
}

// Render Keys
const kGrid = document.getElementById('keyGrid');
if(kGrid) {
    Object.keys(keyData).forEach(k => {
        const key = keyData[k];
        kGrid.innerHTML += `
            <div class="item-card">
                <div class="item-name color-key">${key.name}</div>
                <div class="price">Rp ${key.price}</div>
                <div style="font-size:0.85em;color:#cbd5e1;margin-bottom:20px;flex-grow:1;">${key.desc}</div>
                <button class="buy-btn" onclick="openCheckout('key', '${k}')">BELI SEKARANG</button>
            </div>`;
    });
}

function selectPay(m, el) {
    selectedPayment = m;
    document.querySelectorAll('.pay-option').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
}

function openCheckout(type, id) {
    activeProduct = type === 'rank' ? rankData[id] : keyData[id];
    const titleEl = document.getElementById('modalTitle');
    titleEl.innerText = "CHECKOUT: " + activeProduct.name;
    titleEl.className = activeProduct.cls || 'color-key';
    document.getElementById('checkoutModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('checkoutModal').style.display = 'none';
    selectedPayment = "";
    document.getElementById('snkAgree').checked = false;
    document.querySelectorAll('.pay-option').forEach(o => o.classList.remove('selected'));
}

function prosesBeli() {
    const nick = document.getElementById('playerNick').value;
    const platform = document.getElementById('playerPlatform').value;
    const agree = document.getElementById('snkAgree').checked;
    
    if (!nick || !platform || !selectedPayment || !agree) {
        return alert("Lengkapi data, pilih pembayaran, dan setujui S&K!");
    }

    const msg = `Halo Admin AeroBlast!%0A%0A*PESANAN BARU*%0A- Produk: ${activeProduct.name}%0A- Harga: Rp ${activeProduct.price}%0A- Nickname: ${nick}%0A- Platform: ${platform}%0A- Pembayaran: ${selectedPayment}%0A%0ASaya sudah menyetujui S&K.`;
    window.open(`https://wa.me/628123731343?text=${msg}`);
    closeModal();
}
