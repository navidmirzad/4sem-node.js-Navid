<script>
    export let child;
    export let onShowLove;
    export let onTakeFromTreasureChest;
</script>

<div
    class:is-girl={child.isGirl}
    class:is-boy={!child.isGirl}
    class={child.familySheep || "not-a-sheep"}
>
    <h3>{child.name}</h3>
    <button on:click={() => onShowLove(child.name)}>Show Love 💚</button>
    <button on:click={onTakeFromTreasureChest}>Take from Treasure Chest</button>
</div>

<style>
    .is-girl {
        background-color: blue;
    }

    .is-boy {
        background-color: pink;
    }

    .not-a-sheep {
        border: 0.2em solid rgb(62, 116, 116);
    }

    .grey-sheep {
        border: 0.2em solid grey;
    }

    .black-sheep {
        border: 0.2em solid green;
    }
</style>
