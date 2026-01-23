<script>
    import {
        Background,
        BackgroundVariant,
        MiniMap,
        Panel,
        SvelteFlow,
        useSvelteFlow,
    } from "@xyflow/svelte";
    import "@xyflow/svelte/dist/style.css";
    import ClarifierTextNode from "./ClarifierTextNode.svelte";
    import { global } from "./Global.svelte";

    const NODE_TYPES = { clariText: ClarifierTextNode };

    // nodes with matching parentID will be rendered
    let layerID = $state(0);

    function getActiveNodes(clariNodes) {
        let activeNodes = [];

        clariNodes.forEach((clariNode) => {
            if (clariNode.parentID == layerID) {
                activeNodes.push(clariNode);
            }
        });

        return activeNodes;
    }

    let nodes = $state.raw(getActiveNodes(global.allNodes));
    // let edges = $state.raw([{ id: "e1-2", source: "1", target: "2" }]);

    // new nodes will be created whenever window is clicked and create node mode is true
    let createNodeMode = $state(false);
    function handlePaneClick(e) {
        if (createNodeMode) {
            createNewNode(e);
        }
    }

    let { screenToFlowPosition } = useSvelteFlow();
    function createNewNode(e) {
        let flowPosition = screenToFlowPosition({x: e.x, y: e.y});

        let newNode = {
            id: Date.now().toString(),
            title: "1st Node",
            data: { label: "Hello World" },
            position: {x: flowPosition.x, y: flowPosition.y},
            parentID: layerID,
            childrenIDs: [],
        };

        nodes = [...nodes, newNode];
    }
</script>

<div class="w-dvw h-dvh">
    <SvelteFlow
        snapGrid={[40, 40]}
        nodeTypes={NODE_TYPES}
        bind:nodes
        panOnDrag={!createNodeMode}
        onpaneclick={(e) => {
            handlePaneClick(e.event);
        }}
    >
        <Panel position="top-center">
            <div class="p-5 bg-white">
                <button
                    onclick={() => {
                        createNodeMode = !createNodeMode;
                    }}>Create Node Mode: {createNodeMode}</button
                >
            </div>
        </Panel>
        <MiniMap />
        <Background variant={BackgroundVariant.Lines} />
    </SvelteFlow>
</div>
