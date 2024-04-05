<script>
    export let parentName;
    export let myChildren;

    import Child from "../Child/Child.svelte";

    function handleShowLove(childName) {
        alert("Showed love 💚")
        alert(`${parentName} is loved by ${childName} very much!!`)
    }
</script>

<h1>{parentName}</h1>

{#each myChildren as child}
    <Child child={child} onShowLove={handleShowLove} />
{/each}
