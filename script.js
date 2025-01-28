// Integrasi API Harga Crypto (CoinGecko)
async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana');
        const data = await response.json();
        
        const priceContainer = document.getElementById('crypto-prices');
        priceContainer.innerHTML = data.map(coin => `
            <div class="crypto-item">
                <img src="${coin.image}" alt="${coin.name}" width="30">
                <span>${coin.name}</span>
                <span>$${coin.current_price.toLocaleString()}</span>
                <span class="${coin.price_change_percentage_24h > 0 ? 'up' : 'down'}">
                    ${coin.price_change_percentage_24h.toFixed(2)}%
                </span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
}

// Form Newsletter
document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    
    // Simulasi pengiriman ke backend (gunakan Formspree atau layanan sejenis)
    try {
        await fetch('https://formspree.io/f/your-form-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        alert('Terima kasih telah berlangganan!');
        e.target.reset();
    } catch (error) {
        alert('Gagal berlangganan. Silakan coba lagi.');
    }
});

// Jalankan saat halaman dimuat
window.onload = () => {
    fetchCryptoPrices();
};