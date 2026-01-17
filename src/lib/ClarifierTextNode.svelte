<script>
    import { useSvelteFlow } from "@xyflow/svelte";
    import { global } from "./Global.svelte";
    let { id, data } = $props();

    let { updateNodeData } = useSvelteFlow();
</script>

<!-- title -->
 <div class="border-5 rounded ">
     <div class="text-white bg-gray-500 p-1">
         <label for="title">Title:</label>
         <input
             id="text"
             name="title"
             value={data.text}
             oninput={(e) => {
                 updateNodeData(id, { text: e.currentTarget.value });
             }}
             class="nodrag2"
         />
         <!-- layer button -->
         <button class="text-black bg-white border-2 rounded p-1"> 
            lyr
        </button>
     
         <!-- textbox -->
         <div class="size-fit border rounded-xl text-gray-400 bg-white p-6">
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
     </div>
 </div>
