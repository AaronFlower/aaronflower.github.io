<template>
  <div class="icons-container">
    <div class="icon-item clearfix">
      <Icon type="send"></Icon>
      <p>send</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="github"></Icon>
      <p>github</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="search"></Icon>
      <p>search</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="facebook"></Icon>
      <p>facebook</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="twitter"></Icon>
      <p>twitter</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="check"></Icon>
      <p>check</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="expand_less"></Icon>
      <p>expand_less</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="expand_more"></Icon>
      <p>expand_more</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="first_page"></Icon>
      <p>first_page</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="last_page"></Icon>
      <p>last_page</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="kb_backspace"></Icon>
      <p>kb_backspace</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="kb_capslock"></Icon>
      <p>kb_capslock</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="kb_tab"></Icon>
      <p>kb_tab</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="rotate_left"></Icon>
      <p>rotate_left</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="rss_feed"></Icon>
      <p>rss_feed</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="search2"></Icon>
      <p>search2</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="download"></Icon>
      <p>download</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="emoji-flirt"></Icon>
      <p>emoji-flirt</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="weibo"></Icon>
      <p>weibo</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="loading-buble"></Icon>
      <p>loading</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="loading-quarter"></Icon>
      <p>loading</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="loading_3"></Icon>
      <p>loading</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="loading-3quarters"></Icon>
      <p>loading</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="person"></Icon>
      <p>person</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="information"></Icon>
      <p>information</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="favorite"></Icon>
      <p>favorite</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="edit"></Icon>
      <p>edit</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="thumbs-up"></Icon>
      <p>thumbs-up</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="return"></Icon>
      <p>return</p>
    </div>
    <div class="icon-item clearfix">
      <Icon type="home"></Icon>
      <p>home</p>
    </div>
  </div>
</template>

<script>
  import Icon from '../components/antd/icon/icon'

  export default {
    components: {
      Icon
    }
  }
</script>

<style>
  .icons-container {
    & .icon-item {
      display: inline-block;
      text-align: center;
      width: 100px;
      margin: 5px;
      & .tui-icon:hover {
        color: #00BCD4;
        font-size: 1.1em;
      }
    }
  }
</style>
