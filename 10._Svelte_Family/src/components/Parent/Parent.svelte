<script>
    export let parentName;
    export let myChildren;

    import Child from "../Child/Child.svelte";
    import { fridgeMessages } from "../../stores/fridgeMessageStore";

    function handleShowLove(childName) {
        alert(`${parentName} is loved by ${childName} very much!! 💚`)
    }

    let treasureChest = [ "💸", "📉", "💎"]

    function handleTakeFromTreasureChest() {
        treasureChest.pop();
        treasureChest = treasureChest;
    }

    function clearFridgeMessages() {
        fridgeMessages.set([ { message: "Svelte Family Fridge"} ]);
    }

</script>

<h1>{parentName}</h1>
<button on:click={clearFridgeMessages}>Clear Fridge Messages!</button>

<p>
{#each treasureChest as treasure}
    {treasure + " "}
{/each}
</p>

{#each myChildren as child}
    <Child child={child} onShowLove={handleShowLove} 
    onTakeFromTreasureChest={handleTakeFromTreasureChest} />
{/each}
