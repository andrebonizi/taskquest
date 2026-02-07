<script lang="ts">
  const MUSIC_ICON = "🎵";

  let audio: HTMLAudioElement;
  let button: HTMLButtonElement;

  function handleMusic(event) {
    event.preventDefault();

    if (audio.paused) {
      button.style.background = "linear-gradient(white, green)";
      audio.play();
    } else {
      button.style.background = "linear-gradient(white, gray)";
      audio.pause();
    }
  }
</script>

<div>
  <audio
    id="bg-music"
    src="/music/gangsta_medieval.mp3"
    loop
    controls
    hidden
    bind:this={audio}
  >
    <track kind="captions" />
  </audio>
  <button
    id="bg-music-control"
    class="music-button"
    on:click={handleMusic}
    bind:this={button}
  >
    {MUSIC_ICON}
  </button>
</div>

<style>
  .music-button {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 15px;
    bottom: 10px;
    right: 10px;
    width: 10px;
    height: 10px;
    cursor: pointer;
    box-shadow: 3px 3px 3px rgb(83, 83, 83);
    background: linear-gradient(white, gray);
  }
</style>
