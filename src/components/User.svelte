<script>
    export let user;
</script>

<img class="user-logo"  src={user.photoURL} alt={user.displayName}/>
<div class="hero-name">{user.displayName}</div>

<style>
    .user-logo {
		border-radius: 50%;
        width: 10%;
        min-width: 47px;
        height: fit-content;
	}

    .hero-name {
        font-size: 2rem;
        text-shadow: 3px 3px 5px black;
        color: wheat;
        width: fit-content;
    }
</style>