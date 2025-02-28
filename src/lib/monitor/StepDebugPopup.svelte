<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let stepId = "" ;

  // Handle form submission
  function handleSubmit() {
    // Dispatch the chart details to the parent component
    dispatch('addStepDebug', {stepId});
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
        <h5 class="modal-title">Add Debug on Step {stepId}</h5>
        <button class="btn-close" aria-label="Close" on:click={() => dispatch('close')}></button>
      </div>
      <div class="modal-body">
        <form>
          <!-- Key -->
          <div class="mb-3">
            <label class="form-label">Key</label>
            <input type="text" class="form-control" />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" on:click={() => dispatch('close')}>Cancel</button>
        <button class="btn btn-primary" on:click={handleSubmit}>Confirm</button>
      </div>
    </div>
  </div>
</div>