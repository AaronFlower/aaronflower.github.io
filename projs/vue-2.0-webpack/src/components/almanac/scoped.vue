<template>
  <div class="af-scoped">
    <p>
      Scoped Styles only affect the current components.
    </p>
    <h1 class="header1">Hello Vue Scoped Header 1</h1>
    <h2 class="header2">Hello Vue Scoped Header 2</h2>
    <input type="search">
  </div>
</template>

<style scoped>
  .header1, .header2 {
    font-size: smaller;
  }
  .header1:before, .header2:before {
    content: 'scoped';
    font-size: x-small;
    color: #ccc;
  }
</style>
