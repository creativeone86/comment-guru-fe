<script>
    import Layout from "../layouts/auth";
    import {mapState, mapActions} from "vuex";
    import {required, minLength} from "vuelidate/lib/validators";

    /**
     * Login component
     */
    export default {
        components: {Layout},
        data() {
            return {
                username: "",
                password: "",
                submitted: false
            };
        },
        computed: {
            ...mapState("account", ["status"]),
            ...mapState({
                alert: state => state.alert
            })
        },
        validations: {
            username: {required},
            password: {required, minLength: minLength(6)}
        },
        created() {
            // reset login status
            this.logout();
        },
        methods: {
            ...mapActions("account", ["login", "logout"]),
            handleSubmit() {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                } else {
                    const {username, password} = this;
                    if (username && password) {
                        this.login({username, password});
                    }
                }
            }
        }
    };
</script>

<template>
    <Layout>
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-5">
                <div class="card overflow-hidden">
                    <div class="bg-soft-primary">
                        <div class="row">
                            <div class="col-7">
                                <div class="text-primary p-4">
                                    <h5 class="text-primary">Welcome !</h5>
                                    <p>Sign in to continue to MG.</p>
                                </div>
                            </div>
                            <div class="col-5 align-self-end">
                                <img src="@/assets/images/profile-img.png" alt class="img-fluid"/>
                            </div>
                        </div>
                    </div>
                    <div class="card-body pt-0">
                        <div>
                            <router-link tag="a" to="/">
                                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img src="@/assets/images/logo.svg" alt height="34"/>
                  </span>
                                </div>
                            </router-link>
                        </div>

                        <div v-if="alert.message" :class="'alert ' + alert.type">{{alert.message}}</div>

                        <b-form class="p-2" @submit.prevent="handleSubmit">
                            <b-form-group id="input-group-1" label="Username" label-for="username">
                                <b-form-input
                                        id="username"
                                        v-model="username"
                                        type="text"
                                        placeholder="Enter username"
                                        :class="{ 'is-invalid': submitted && $v.username.$error }"
                                ></b-form-input>
                                <div
                                        v-if="submitted && !$v.username.required"
                                        class="invalid-feedback">Username is required
                                </div>
                            </b-form-group>

                            <b-form-group id="input-group-2" label="Password" label-for="input-2">
                                <b-form-input
                                        id="input-2"
                                        v-model="password"
                                        type="password"
                                        placeholder="Enter password"
                                        :class="{ 'is-invalid': submitted && $v.password.$error }"
                                ></b-form-input>
                                <div v-if="submitted && $v.password.$error" class="invalid-feedback">
                                    <span v-if="!$v.password.required">Password is required.</span>
                                    <span v-if="!$v.password.minLength">Password must be greater than 6 characters.</span>
                                </div>
                            </b-form-group>
                            <br/>

                            <div class="mt-3">
                                <b-button type="submit" variant="primary" class="btn-block">Jump In</b-button>
                            </div>
                        </b-form>
                    </div>
                    <!-- end card-body -->
                </div>
                <!-- end card -->
                <!-- end row -->
            </div>
            <!-- end col -->
        </div>
        <!-- end row -->
    </Layout>
</template>

<style lang="scss" module></style>
