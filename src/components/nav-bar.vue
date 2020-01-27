
<script>
import { mapState } from "vuex";

/**
 * Nav-bar Component
 */
export default {
  props: {
    user: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    }
  }
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex"></div>
      <div class="d-flex">
        <div class="d-inline-block">
          <a class="text-danger center-logout" href="/login">
            <i class="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i> Logout
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
