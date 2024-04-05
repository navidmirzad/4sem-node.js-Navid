<script>
    export let child;
    export let onShowLove;
    export let onTakeFromTreasureChest;

    import { fridgeMessages } from "../../stores/fridgeMessageStore";

    let fridgeMessageInputValue = "";

    function submitFridgeMessage() {
        const newFridgeMessage = {
            creator: child.name,
            message: fridgeMessageInputValue
        }

        // Set for simple assignments or single objects/items
        // fridgeMessages.set([...$fridgeMessages, newFridgeMessage]);
        // fridgeMessageInputValue = "";


        // used for more complex assignments
        fridgeMessages.update((fridgeMessagesStoreValue) => {
            fridgeMessagesStoreValue.push(newFridgeMessage);
            return fridgeMessagesStoreValue;
        });

        fridgeMessageInputValue = "";
    }


</script>

<div
    class:is-girl={child.isGirl}
    class:is-boy={!child.isGirl}
    class={child.familySheep || "not-a-sheep"}
>
    <h3>{child.name}</h3>

    <label for="fridgeMessage">Write a message for the fridge!</label>
    <input type="text" name="fridgeMessage" placeholder="Fridge Message..."
            bind:value={fridgeMessageInputValue}
    >
    <br>
    <button on:click={submitFridgeMessage}>Submit Fridge Message</button>
    <br><br>

    <button on:click={onShowLove(child.name)}>Show Love 💚</button>

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
