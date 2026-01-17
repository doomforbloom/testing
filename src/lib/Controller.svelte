<script>
  import { useSvelteFlow } from '@xyflow/svelte';
  import { onMount, onDestroy } from 'svelte';
            
  const { setViewport, getViewport } = useSvelteFlow();

  let keysDown = { w: false, a: false, s: false, d: false };
  const MOVE_SPEED = 40; 
  let frameId;

  function updateMovement() {
    let dx = 0;
    let dy = 0;

    if (keysDown.w) dy += MOVE_SPEED;
    if (keysDown.s) dy -= MOVE_SPEED;
    if (keysDown.a) dx += MOVE_SPEED;
    if (keysDown.d) dx -= MOVE_SPEED;

    if (dx !== 0 || dy !== 0) {
      const current = getViewport();
      // Use setViewport to keep the internal mouse-state in sync
      setViewport({ 
        x: current.x + dx, 
        y: current.y + dy, 
        zoom: current.zoom 
      }, { duration: 0 }); // duration: 0 makes it instant/smooth for WASD
    }

    frameId = requestAnimationFrame(updateMovement);
  }

  function handleKeyDown(e) {
    const key = e.key.toLowerCase();
    if (key in keysDown) {
      // Prevent browser scroll
      if (['w','a','s','d'].includes(key)) e.preventDefault();
      keysDown[key] = true;
    }
  }

  function handleKeyUp(e) {
    const key = e.key.toLowerCase();
    if (key in keysDown) keysDown[key] = false;
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    frameId = requestAnimationFrame(updateMovement);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    cancelAnimationFrame(frameId);
  });
</script>