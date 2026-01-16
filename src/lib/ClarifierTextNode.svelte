<script>
    import { useSvelteFlow } from "@xyflow/svelte";
    let { id, data } = $props();

    let { updateNodeData } = useSvelteFlow();
</script>

<div class="size-fit border rounded-xl bg-black p-6">
    <label for="text">Text:</label>
    <input
        id="text"
        name="text"
        value={data.text}
        oninput={(e) => {
            updateNodeData(id, { text: e.currentTarget.value });
        }}
        class="nodrag"
    />
</div>
