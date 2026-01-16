<script>
    import { useSvelteFlow } from "@xyflow/svelte";
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
         <div class="size-fit border rounded-xl text-black bg-white p-6">
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
     </div>
 </div>
