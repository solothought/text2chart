<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let chartDetails = {
    title: '',
    type: '',
    msg: '',
    key: '',
    range: {
      fromType: '', // 'relative' or 'specific'
      fromRelativeValue: '', // Numeric value for relative range
      fromRelativeUnit: '', // Unit for relative range (minutes, hours, etc.)
      fromSpecificDateTime: '', // Specific date and time
      to: '' // Optional end date and time
    }
  };

  // Handle form submission
  function handleSubmit() {
    // Validate inputs before dispatching
    if (!chartDetails.title || !chartDetails.type || !chartDetails.msg || !chartDetails.key) {
      alert('Please fill in all required fields.');
      return;
    }

    // Dispatch the chart details to the parent component
    dispatch('addChart', chartDetails);
    dispatch('close');
  }
</script>
<style>
.d-block{
  background: rgba(0, 0, 0, 0.5);
}
</style>
<div class="modal d-block" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Chart</h5>
        <button class="btn-close" aria-label="Close" on:click={() => dispatch('close')}></button>
      </div>
      <div class="modal-body">
        <form>
          <!-- Chart Title -->
          <div class="mb-3">
            <label class="form-label">Chart Title</label>
            <input type="text" class="form-control" bind:value={chartDetails.title} required />
          </div>

          <!-- Chart Type -->
          <div class="mb-3">
            <label class="form-label">Type</label>
            <select class="form-select" bind:value={chartDetails.type} required>
              <option value="">Select Type</option>
              <option value="4">ERROR</option>
              <option value="1">DEBUG</option>
              <option value="3">WARN</option>
            </select>
          </div>

          <!-- MSG -->
          <div class="mb-3">
            <label class="form-label">Like</label>
            <input type="text" class="form-control" bind:value={chartDetails.msg} required />
          </div>

          <!-- Key -->
          <div class="mb-3">
            <label class="form-label">Key</label>
            <input type="text" class="form-control" bind:value={chartDetails.key} />
          </div>

          <!-- Range From -->
          <div class="mb-3">
            <label class="form-label">Range (From)</label>
            <div class="d-flex align-items-center gap-2">
              <select class="form-select" bind:value={chartDetails.range.fromType}>
                <option value="">Select Range Type</option>
                <option value="relative">Relative</option>
                <option value="specific">Specific Date and Time</option>
              </select>

              {#if chartDetails.range.fromType === 'relative'}
                <input
                  type="number"
                  class="form-control"
                  placeholder="Value"
                  min="1"
                  bind:value={chartDetails.range.fromRelativeValue}
                  required
                />
                <select class="form-select" bind:value={chartDetails.range.fromRelativeUnit} required>
                  <option value="">Select Unit</option>
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              {:else if chartDetails.range.fromType === 'specific'}
                <input
                  type="datetime-local"
                  class="form-control"
                  bind:value={chartDetails.range.fromSpecificDateTime}
                  required
                />
              {/if}
            </div>
          </div>

          <!-- Range To -->
          <div class="mb-3">
            <label class="form-label">Range (To) (Optional)</label>
            <input
              type="datetime-local"
              class="form-control"
              bind:value={chartDetails.range.to}
            />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" on:click={() => dispatch('close')}>Cancel</button>
        <button class="btn btn-primary" on:click={handleSubmit}>Add</button>
      </div>
    </div>
  </div>
</div>