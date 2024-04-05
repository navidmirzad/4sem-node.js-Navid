<script>
    import { fridgeMessages } from "../../stores/fridgeMessageStore";
</script>

<div class="fridge">
    {#each $fridgeMessages as fridgeMessage} 
    <p>{fridgeMessage.creator ?? "Title"}: {fridgeMessage.message}</p>
    {/each}
</div>

<slot></slot>

<p>Home Sweet Home</p>

<style>
    .fridge {
        background-color: white;
        color: black;
        min-height: 40vh;
        border-radius: 1.5em;
    }
</style>