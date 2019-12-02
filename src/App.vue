<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  *,*::before,*::after{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: unset;
    text-decoration: none;
    background: none;
    border: none;
    font-family: sans-serif;
  }
  .visually-hidden{
    display: block;
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(0 0 0 0);
    overflow: hidden;
    visibility: hidden;
  }
</style>
