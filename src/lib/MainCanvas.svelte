<script>
    import {
        Background,
        BackgroundVariant,
        MiniMap,
        SvelteFlow, 
    } from "@xyflow/svelte";
    import "@xyflow/svelte/dist/style.css";
    import Controller from "./Controller.svelte";
    import ClarifierTextNode from "./ClarifierTextNode.svelte";
    import RightClickMenu from "./RightClickMenu.svelte";

    const NODE_TYPES = { clariText: ClarifierTextNode };
    let nodes = $state.raw([
        { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
        { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
        {
            id: "textNode",
            type: "clariText",
            position: { x: 200, y: 200 },
            data: { text: "hewo uwu" },
        },
    ]);
    let edges = $state.raw([{ id: "e1-2", source: "1", target: "2" }]);

    let rightClicked = $state(false);
    let rightClickMenuCoords = $state({ x: 0, y: 0 });
    function handleRightClick(e) {
        rightClicked = true;
        rightClickMenuCoords.x = e.x;
        rightClickMenuCoords.y = e.y;
    }
</script>

<div class="w-dvw h-dvh">
    <SvelteFlow
        snapGrid={[40, 40]}
        nodeTypes={NODE_TYPES}
        bind:nodes
        bind:edges
        onpanecontextmenu={(e) => {
            handleRightClick(e);
        }}
    >
        <MiniMap />
        <Controller />
        {#if rightClicked}
            <RightClickMenu id="1" data={{ label: "1" }} />
        {/if}
        <Background variant={BackgroundVariant.Lines} />
    </SvelteFlow>
</div>
