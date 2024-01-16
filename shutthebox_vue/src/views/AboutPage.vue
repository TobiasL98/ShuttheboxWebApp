<script>
import MyNavbar from '../components/MyNavbar.vue';

export default {
  components: {
    MyNavbar
  },
}
</script>


<template>
    <MyNavbar/>
    <div style="text-align: center" class="explain">
    <p>Welcome to Shutthebox!</p>
    <p>How to play:</p>
    <p>write Localhost9000/gameX, where X is the move you want to do.</p>
    <p>Available Moves:</p>
    <p>Roll the dice: w</p>
    <p>Shut down a stone: number (1 to 9)</p>
    <p>End your round: next</p>
    <p>Redo: z</p>
    <p>Undo: y</p>
    <p>example: .../game/w to roll the dice</p>
    <img src="src/assets/shutthebox.png" style="max-width:100%; max-height:100%">
</div>
</template>