const rankData = {
    aviator: { title: "AVIATOR", price: "Rp 15.000", features: ["Home limit 5", "/ec", "/wb", "1 VIP key", "Aviator kits"] },
    exostic: { title: "EXOSTIC", price: "Rp 30.000", features: ["Home limit 10", "/feed", "/repair", "5 VIP key", "EXOSTIC kits"] },
    force: { title: "FORCE", price: "Rp 50.000", features: ["Home limit 20", "/ptime", "/anvil", "10 VIP key", "FORCE kits"] },
    xerelion: { title: "XERELION", price: "Rp 75.000", features: ["Home limit 50", "/fly", "/heal", "15 VIP key", "XERELION kits"] },
    galatics: { title: "GALATICS", price: "Rp 100.000", features: ["Home unlimited", "/godmode", "/fly", "18 VIP key", "GALATICS kits"] }
};

// MODAL SYSTEM (ANTI BUG)
function openModal(id) { 
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.setProperty('display', 'flex', 'important');
    }
}

function closeModal(id) { 
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.setProperty('display', 'none', 'important');
    }
    if(id === 'rankModal') backToRankList(); 
}

// RULES ACCORDION
function toggleRule(el) {
    const content = el.nextElementSibling;
    const arrow = el.querySelector('span:last-child');
    const isOpen = content.style.display === 'block';
    content.style.display = isOpen ? 'none' : 'block';
    arrow.innerText = isOpen ? '▼' : '▲';
}

// RANK DETAIL SYSTEM
function showRankDetail(id) {
    const rank = rankData[id];
    document.getElementById('rankList').style.display = 'none';
    document.getElementById('rankDetail').style.display = 'block';
    document.getElementById('detailTitle').innerText = rank.title + " - " + rank.price;
    document.getElementById('detailFeatures').innerHTML = rank.features.map(f => `<div>▸ ${f}</div>`).join('');
    const msg = `Halo Admin! Saya mau beli rank *${rank.title}* seharga *${rank.price}*. Nick: `;
    document.getElementById('rankWaLink').href = `https://wa.me/628123731343?text=${encodeURIComponent(msg)}`;
}

function backToRankList() { 
    document.getElementById('rankList').style.display = 'block'; 
    document.getElementById('rankDetail').style.display = 'none'; 
}

// WHATSAPP SENDER
function sendWA(type) {
    const text = document.getElementById(type + 'Text').value;
    if(!text) return alert("Isi dulu ya!");
    const prefix = type === 'req' ? "REQUEST FITUR:" : "REPORT BUG/PLAYER:";
    window.open(`https://wa.me/628123731343?text=*${prefix}*%0A${encodeURIComponent(text)}`);
    closeModal(type + 'Modal');
}

// NAVBAR MOBILE
function toggleMenu() {
    const menu = document.getElementById('navLinks');
    menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
}

// COPY TEXT FIX (Centang muncul pas diklik aja)
function copyText(val, element) {
    navigator.clipboard.writeText(val);
    const check = element.querySelector('.check-icon');
    
    // Munculkan centang
    check.style.display = 'inline-block';
    
    // Sembunyikan lagi setelah 1.5 detik
    setTimeout(() => { 
        check.style.display = 'none'; 
    }, 1500);
}

// FETCH SERVER STATUS
fetch('https://api.mcsrvstat.us/2/aeroblast.my.id')
    .then(res => res.json())
    .then(data => {
        const isOnline = data.online;
        const statusEl = document.getElementById('s-status');
        if(statusEl) {
            statusEl.innerText = isOnline ? 'ONLINE' : 'OFFLINE';
            statusEl.style.color = isOnline ? '#4ade80' : '#f87171';
        }
        
        const playersEl = document.getElementById('s-players');
        if(playersEl) {
            playersEl.innerText = isOnline ? `${data.players.online}/${data.players.max}` : '-/-';
        }

        const versionEl = document.getElementById('s-version');
        if(versionEl) {
            versionEl.innerText = isOnline ? (data.version || '1.20+') : '-';
        }
    })
    .catch(err => console.error("Error fetching status:", err));
