<script>
    import { fridgeMessages } from "../../stores/fridgeMessageStore";

    export let fridgeHeight = 40;
</script>

<div class="fridge" style="min-height: {fridgeHeight}vh">
    {#each $fridgeMessages as fridgeMessage} 
    <p>{fridgeMessage.creator ?? "Title"}: {fridgeMessage.message}</p>
    {/each}
</div>

<style>
    .fridge {
        background-color: white;
        color: black;
        border-radius: 1.5em;
    }
</style>