<template>

  <div id="topPanel">
        <div id="forwardButton1" class="topPanelSquare">-</div>
        <div id="forwardButton2" class="topPanelSquare">-</div>
        <div id="forwardButton3" class="topPanelSquare">-</div>
        <div id="forwardButton4" class="topPanelSquare">-</div>
        <div id="activeMonth" class="topPanelSquare"></div>
  </div>
</template>

<script>

export default {
  name: 'Header',
  props: {
  },
};

</script>


<style scoped>

#topPanel {
    height: 60px;
    padding-left: 12px;
}

.topPanelSquare {
    margin-top: 10px;
    margin-right: 10px;
    padding: 2px;
    float: left;


    font-family: verdana;
    text-align: center;
    font-size: 35px;
    color: rgb(0, 152, 212);
    background-color: rgb(84, 84, 84);
}

.topPanelSquare:hover {
    background-color: rgb(59, 59, 59);
    cursor: pointer;
}
</style>
