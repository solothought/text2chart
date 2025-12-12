<script>
  import { onMount } from 'svelte';

  // List of ads with image URLs and click destinations
  const ads = [
    {
      image: 'https://solothought.com/products/assets/images/wishin/YouTubeThumbnail.png',
      url: 'https://play.google.com/store/apps/details?id=com.solothought.wishin',
      alt: 'Wishin Product'
    },
    {
      image: 'https://solothought.com/products/assets/images/wishin/self-doubt-evidence.png',
      url: 'https://play.google.com/store/apps/details?id=com.solothought.wishin',
      alt: 'Wishin Product'
    },
    {
      image: 'https://solothought.com/products/assets/images/wishin/WishIn_ad_banner.png',
      url: 'https://play.google.com/store/apps/details?id=com.solothought.wishin',
      alt: 'Wishin Product'
    },
  ];

  let showPopup = false;
  let selectedAd = null;

  onMount(() => {
    // Check if ad was shown today
    const lastShown = localStorage.getItem('adLastShown');
    const today = new Date().toDateString();

    if (lastShown !== today) {
      // Select a random ad
      selectedAd = ads[Math.floor(Math.random() * ads.length)];
      showPopup = true;
      
      // Save today's date
      localStorage.setItem('adLastShown', today);
    }
  });

  function closePopup() {
    showPopup = false;
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  }

  function handleAdClick() {
    if (selectedAd && selectedAd.url) {
      window.open(selectedAd.url, '_blank');
    }
  }
</script>

{#if showPopup && selectedAd}
  <div class="popup-overlay" on:click={handleOverlayClick}>
    <div class="popup-container">
      <button class="close-button" on:click={closePopup} aria-label="Close ad">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div class="ad-content" on:click={handleAdClick} on:keydown={(e) => e.key === 'Enter' && handleAdClick()} role="button" tabindex="0">
        <img src={selectedAd.image} alt={selectedAd.alt} />
      </div>
    </div>
  </div>
{/if}

<style>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .popup-container {
    position: relative;
    max-width: 90%;
    max-height: 90vh;
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease-out;
    overflow: hidden;
  }

  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: background-color 0.2s, transform 0.2s;
    color: white;
  }

  .close-button:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  .close-button:active {
    transform: scale(0.95);
  }

  .ad-content {
    cursor: pointer;
    display: block;
    max-width: 800px;
    max-height: 85vh;
  }

  .ad-content img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 12px;
  }

  .ad-content:hover {
    opacity: 0.95;
  }

  @media (max-width: 768px) {
    .popup-container {
      max-width: 95%;
    }

    .ad-content {
      max-width: 100%;
    }
  }
</style>