<script>
    import {
        Background,
        BackgroundVariant,
        MiniMap,
        Panel,
        SvelteFlow,
        useNodes,
        useSvelteFlow,
    } from "@xyflow/svelte";
    import "@xyflow/svelte/dist/style.css";
    import Controller from "./Controller.svelte";
    import ClarifierTextNode from "./ClarifierTextNode.svelte";
    import { global } from "./Global.svelte";

    const NODE_TYPES = { clariText: ClarifierTextNode };

    let nodes = $state.raw([
        { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
        { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
        { id: "3", type: "clariText", position: {x: 400, y: 400}, data: {text: "yesss"} }
    ]);
    let edges = $state.raw([{ id: "e1-2", source: "1", target: "2" }]);

    let newNodeModeActive = $state(false);
    let { screenToFlowPosition } = useSvelteFlow()

    function createNewNode(e) {
        if (newNodeModeActive) {
            let flowCoords = screenToFlowPosition({x: e.clientX, y: e.clientY});
            let newNode = { id: Date.now().toString(), type: "clariText", position: {x: flowCoords.x, y: flowCoords.y}, data: {text: "yesss"}};
            nodes = [...nodes, newNode];
        }
    }
</script>

<svelte:window onclick={createNewNode} />
<div class="w-dvw h-dvh">
    <SvelteFlow
        snapGrid={[40, 40]}
        nodeTypes={NODE_TYPES}
        bind:nodes
        bind:edges
        panOnDrag={!newNodeModeActive}
    >
        <Panel position="top-center">
            <div class="flex flex-col gap-2 p-6 py-4 bg-teal-100 border">
                <h1 class="font-semibold text-2xl">Tools</h1>
                <div>
                    <button
                        onclick={() => {newNodeModeActive = !newNodeModeActive; console.log("newNodeModeActive: ", newNodeModeActive);
                        }}
                        class="hover:bg-teal-400 active:bg-teal-500 p-2 bg-teal-200 border"
                        >Create Node Mode</button
                    >
                    <button
                        class="hover:bg-teal-400 active:bg-teal-500 p-2 bg-teal-200 border"
                        >Delete Node Mode</button
                    >
                </div>
            </div>
        </Panel>
        <MiniMap />
        {#if !global.typingMode}
            <Controller />
        {/if}
        <Background variant={BackgroundVariant.Lines} />
    </SvelteFlow>
</div>
