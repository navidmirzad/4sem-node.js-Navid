
<script>
    export let numberOfFriends = 0;

    function alieNateFriend() {
        numberOfFriends--;
    }

</script>

<div>
    Friends Counter: 
</div>
<h1>{numberOfFriends}</h1>
<button on:click={alieNateFriend}>Alienate A Friend</button>