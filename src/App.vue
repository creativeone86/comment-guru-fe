<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "app",
  computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
  watch: {
    /**
     * Clear the alert message on route change
     */
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    }
  }
};
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>
