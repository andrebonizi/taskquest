<script>
  import { map } from '../../data/icons';
</script>

<div class="map">
  <div class="floor"></div>
  <p style="top: 5%; left: 10%; font-size: 5rem;">{map.cloud}</p>
  <p style="top: 3%; left: 50%; font-size: 3rem;">{map.cloud}</p>
  <p style="top: 3%; left: 60%; font-size: 8rem;">{map.cloud}</p>
  <p class="snowmountain">{map.snowmountain}</p>
  <p class="mountain">{map.mountain}</p>
  <p style="font-size: 3rem; top: 35%; left:50%;">{map.rock}</p>
  <p class="pine">{map.tree}</p>
  <p class="tree">{map.pine}</p>
  <p style="font-size: 5rem; top: 25%; left:40%;">{map.pine}</p>
  <p style="font-size: 7rem; top: 26%; left:20%;">{map.pine}</p>
  <p class="tree">{map.pine}</p>
  <p class="tree">{map.pine}</p>
  <p class="tree">{map.pine}</p>
  <p style="font-size: 5rem; top: 50%;">{map.rock}</p>
</div>

<style>
  .map {
    z-index: 2;
    position: fixed;
    background-color: lightblue;
    background: linear-gradient(to top, white, steelblue);
    border-radius: 50px;
    width: 90vw;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    overflow: hidden;
  }
  .floor {
    position: fixed;
    background: linear-gradient(to top, brown, darkgreen);
    height: 70%;
    width: 100%;
    bottom: 0;
  }
  .map > p {
    position: fixed;
  }
  .mountain {
    font-size: 8rem;
    top: 15%;
    left: 20%;
  }
  .snowmountain {
    font-size: 5rem;
    top: 20%;
    left: 50%;
  }
  .tree {
    font-size: 11rem;
    top: 20%;
    left: 50%;
  }
  .pine {
    font-size: 7rem;
    top: 25%;
    left: 1%;
  }
</style>
