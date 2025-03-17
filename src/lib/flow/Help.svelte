<script>
  // Reactive state to track popup visibility
  let isPopupVisible = false;

  // Function to toggle popup visibility
  function togglePopup() {
    isPopupVisible = !isPopupVisible;
  }

  // Function to close the popup when clicking outside
  function closePopup(event) {
    if (event.target === event.currentTarget) {
      isPopupVisible = false;
    }
  }
</script>

<style>
  .help-link {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }

  .popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .popup-box {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 700px;
    width: 100%;
  }
  .help-table {
    /* width: 100%; */
    border-collapse: collapse;
    margin: 10px;
  }
  .help-table td{
    min-width: 200px;
  }
</style>

<!-- Help link -->
<a class="help-link" on:click={togglePopup}>Help</a>

<!-- Popup container -->
{#if isPopupVisible}
  <div class="popup-container" on:click={closePopup}>
    <div class="popup-box">
      <p><a href="https://github.com/NaturalIntelligence/text2obj" target="_blank">Algorithm Syntax</a></p>
      <div>
        <h3>Hover a Node</h3>
        <table class="help-table">
          <tbody>
            <tr>
              <td>with <kbd>a</kbd></td>
              <td>Highlight all the paths passing through</td>
            </tr>
            <tr>
              <td>with <kbd>q</kbd></td>
              <td>Highlight all the steps after</td>
            </tr>
            <tr>
              <td>with <kbd>b</kbd></td>
              <td>Highlight all the steps before</td>
            </tr>
            <tr>
              <td>with <kbd>s</kbd></td>
              <td>Highlight shortest path passing through</td>
            </tr>
          </tbody>
        </table>
      </div>
      <small>Keep the key held and hover out from the node to remove the selection.</small>
      <div>
        <h3>Click a Node</h3>
        <table class="help-table">
          <tbody>
            <tr>
              <td>No key</td>
              <td>Expand/Collapse child steps</td>
            </tr>
            <tr>
              <td>with <kbd>]</kbd></td>
              <td>Collapse all nested branches</td>
            </tr>
            <tr>
              <td>with <kbd>[</kbd></td>
              <td>Expand all nested branches</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
{/if}