<script>
    import { useSvelteFlow } from "@xyflow/svelte";
    let { id, data } = $props();

    let { updateNodeData } = useSvelteFlow();
</script>

<div class="flex flex-col gap-2 size-fit border rounded-xl bg-white px-6 py-15">
    <button>Create Node</button>
    <button>Log uwu</button>
    <button>idk</button>
    <button onclick={() => {window.location.href="https://www.gettyimages.com/photos/ben-shapiro"}}>ben shaquiro</button>
</div>
