<script>
    import { useSvelteFlow } from "@xyflow/svelte";
    import { global } from "./Global.svelte";
    let { id, data } = $props();

    let { updateNodeData } = useSvelteFlow();
</script>

<div class="size-fit border rounded-xl bg-gray-400 p-6">
    <label for="text">Text:</label>
    <input
        id="text"
        name="text"
        value={data.text}
        onclick={() => {global.typingMode = true}}
        oninput={(e) => {
            updateNodeData(id, { text: e.currentTarget.value });
        }}
        onblur={() => {global.typingMode = false}}
        class="nodrag"
    />
</div>
