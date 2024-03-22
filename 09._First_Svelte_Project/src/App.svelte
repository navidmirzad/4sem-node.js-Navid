<script>
  import FriendsCounter from "./components/FriendsCounter/FriendsCounter.svelte";
  import Greeter from "./components/Greeter/Greeter.svelte";
</script>

<main>
  <Greeter name="Navid"></Greeter>
  <Greeter name="Kyrie Irving"></Greeter>
  <Greeter></Greeter>

  <FriendsCounter numberOfFriends={3}></FriendsCounter>
</main>

