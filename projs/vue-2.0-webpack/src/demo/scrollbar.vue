<template>
  <div class="mali-scroll-bar-container">
    <h1 class="animated infinite bounce">Example</h1>
    <h2>Scroll Bar Demo 01</h2>
    <p class="scroll-paragraph" id="content-01">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tellus vitae eros fermentum, in fermentum nulla rhoncus. Duis nisl sem, suscipit quis nisl eget, sollicitudin elementum felis. Donec iaculis elit mi, sed dignissim sem tristique eget. Maecenas fermentum accumsan augue, et dapibus justo lacinia eget. Quisque sem tortor, efficitur vel orci ut, volutpat molestie nulla. Mauris tristique urna lorem, id semper tellus dictum in. Phasellus aliquet eleifend rutrum. Praesent sodales libero id diam suscipit luctus. Nunc a nibh efficitur, auctor magna vitae, mollis purus.

      Curabitur elementum et mi quis cursus. Maecenas ipsum mauris, convallis id commodo ut, ultrices nec mi. Curabitur ultricies ante vel convallis placerat. Nunc maximus fringilla enim, at porta tellus mattis eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut ac cursus lacus, pharetra hendrerit nisi. Sed et efficitur dolor. Aenean sed lorem erat. Praesent urna ex, sollicitudin a pulvinar ac, rhoncus eget justo. Aenean placerat libero accumsan magna imperdiet, eu fringilla tortor dignissim.

      Nulla est dui, dignissim tincidunt suscipit eu, gravida vel nisl. Aenean viverra massa at magna luctus, in sollicitudin augue efficitur. Vivamus lacinia ut eros eu porta. Donec pharetra ac arcu at facilisis. Mauris augue purus, euismod at viverra nec, pulvinar suscipit felis. Nunc nisi metus, maximus eu condimentum ac, ultrices non ipsum. Suspendisse consequat metus laoreet odio scelerisque porta. Sed a nunc cursus augue commodo tincidunt. Curabitur sit amet eros sem. Sed eleifend eros in sagittis consequat. Proin lorem lacus, hendrerit ac diam et, finibus facilisis nisi. Cras placerat magna quis viverra mollis.
    </p>
    <p class="scroll-paragraph" id="content-02">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tellus vitae eros fermentum, in fermentum nulla rhoncus. Duis nisl sem, suscipit quis nisl eget, sollicitudin elementum felis. Donec iaculis elit mi, sed dignissim sem tristique eget. Maecenas fermentum accumsan augue, et dapibus justo lacinia eget. Quisque sem tortor, efficitur vel orci ut, volutpat molestie nulla. Mauris tristique urna lorem, id semper tellus dictum in. Phasellus aliquet eleifend rutrum. Praesent sodales libero id diam suscipit luctus. Nunc a nibh efficitur, auctor magna vitae, mollis purus.

      Curabitur elementum et mi quis cursus. Maecenas ipsum mauris, convallis id commodo ut, ultrices nec mi. Curabitur ultricies ante vel convallis placerat. Nunc maximus fringilla enim, at porta tellus mattis eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut ac cursus lacus, pharetra hendrerit nisi. Sed et efficitur dolor. Aenean sed lorem erat. Praesent urna ex, sollicitudin a pulvinar ac, rhoncus eget justo. Aenean placerat libero accumsan magna imperdiet, eu fringilla tortor dignissim.

      Nulla est dui, dignissim tincidunt suscipit eu, gravida vel nisl. Aenean viverra massa at magna luctus, in sollicitudin augue efficitur. Vivamus lacinia ut eros eu porta. Donec pharetra ac arcu at facilisis. Mauris augue purus, euismod at viverra nec, pulvinar suscipit felis. Nunc nisi metus, maximus eu condimentum ac, ultrices non ipsum. Suspendisse consequat metus laoreet odio scelerisque porta. Sed a nunc cursus augue commodo tincidunt. Curabitur sit amet eros sem. Sed eleifend eros in sagittis consequat. Proin lorem lacus, hendrerit ac diam et, finibus facilisis nisi. Cras placerat magna quis viverra mollis.
    </p>
    <p class="scroll-paragraph" id="content-03">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus facilisis tellus vitae eros fermentum, in fermentum nulla rhoncus. Duis nisl sem, suscipit quis nisl eget, sollicitudin elementum felis. Donec iaculis elit mi, sed dignissim sem tristique eget. Maecenas fermentum accumsan augue, et dapibus justo lacinia eget. Quisque sem tortor, efficitur vel orci ut, volutpat molestie nulla. Mauris tristique urna lorem, id semper tellus dictum in. Phasellus aliquet eleifend rutrum. Praesent sodales libero id diam suscipit luctus. Nunc a nibh efficitur, auctor magna vitae, mollis purus.

      Curabitur elementum et mi quis cursus. Maecenas ipsum mauris, convallis id commodo ut, ultrices nec mi. Curabitur ultricies ante vel convallis placerat. Nunc maximus fringilla enim, at porta tellus mattis eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut ac cursus lacus, pharetra hendrerit nisi. Sed et efficitur dolor. Aenean sed lorem erat. Praesent urna ex, sollicitudin a pulvinar ac, rhoncus eget justo. Aenean placerat libero accumsan magna imperdiet, eu fringilla tortor dignissim.

      Nulla est dui, dignissim tincidunt suscipit eu, gravida vel nisl. Aenean viverra massa at magna luctus, in sollicitudin augue efficitur. Vivamus lacinia ut eros eu porta. Donec pharetra ac arcu at facilisis. Mauris augue purus, euismod at viverra nec, pulvinar suscipit felis. Nunc nisi metus, maximus eu condimentum ac, ultrices non ipsum. Suspendisse consequat metus laoreet odio scelerisque porta. Sed a nunc cursus augue commodo tincidunt. Curabitur sit amet eros sem. Sed eleifend eros in sagittis consequat. Proin lorem lacus, hendrerit ac diam et, finibus facilisis nisi. Cras placerat magna quis viverra mollis.
    </p>
  </div>
</template>

<script>
  var $ = require('jquery')
  var wheel = require('imports?define=>false&this=>window!jquery-mousewheel')
  var malihuCustomScrollbarPlugin = require('imports?define=>false&this=>window!malihu-custom-scrollbar-plugin')
  console.log('wheel....', wheel)
  console.log('scroll bar....', malihuCustomScrollbarPlugin)
  wheel($)
  // malihuCustomScrollbarPlugin($)
  // wheel.on('ready', function () {
  //   require('imports-loader?$=jquery&define=>false&this=>window!malihu-custom-scrollbar-plugin')($)
  // })
  // require('jquery-mousewheel')($)
  // require('imports-loader?$=jquery&define=>false&this=>window!malihu-custom-scrollbar-plugin')($)
  // import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
  require('malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css')
  require('malihu-custom-scrollbar-plugin')
  require('animate.css')
  $(function () {
    $('#content-01').mCustomScrollbar({
      theme: 'minimal-dark'
    })
    $('#content-02').mCustomScrollbar({
      theme: 'dark'
    })
    $('#content-03').mCustomScrollbar({
      theme: 'rounded-dots'
    })
  })
</script>

<style>
  /*@import url(../assets/css/mCustomScrollbar.css);*/
  p.scroll-paragraph {
    border: 1px dashed #ccc;
    width: 400px;
    height: 300px;
    text-align: justify;
    overflow-y: scroll;
  }
</style>
