<script>
  import Status from './Status.svelte';

  export let hero;
  export let user;
</script>

<main class="container">
  <Status {hero} {user} />
</main>

<style>
  .container {
    background: linear-gradient(rgba(63, 63, 63, 0.69), rgb(16, 32, 44));
    border-radius: 10px;
    border: 2px outset gray;
    padding-left: 10px;
    font-family: 'Lobster';
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
