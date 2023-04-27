<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
					transition="scale-transition"
					width="40" />

				<v-img
					alt="Vuetify Name"
					class="shrink mt-1 hidden-sm-and-down"
					contain
					min-width="100"
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
					width="100" />
			</div>
			<v-spacer></v-spacer>
			<v-btn text to="/">Landing</v-btn>
			<v-btn v-show="isAuthenticated" text to="/animal">New Animal</v-btn>
			<v-btn v-show="false && isAuthenticated" text to="/profile">
				Profile
			</v-btn>
			<v-btn v-show="!isAuthenticated" text to="/login">Login</v-btn>
			<v-btn v-show="!isAuthenticated" text to="/registration">
				Registration
			</v-btn>
			<v-btn v-show="isAuthenticated" @click="signOut" text>Logout</v-btn>

			<v-spacer></v-spacer>
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import { auth, getAuth, onAuthStateChanged, signOut } from "../firebase.js";
export default {
	name: "App",
	data() {
		return {
			isAuthenticated: false,
			isAuthorized: false,
			email: null,
			showRequest: false,
			showAdd: false,
		};
	},
	methods: {
		signOut() {
			const auth = getAuth();
			signOut(auth)
				.then(() => {
					console.log("signed out");
				})
				.catch((error) => {
					// An error happened.
				});
		},
	},
	beforeCreate() {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log("Authenticated");
				this.isAuthenticated = true;
			} else {
				console.log("Not Authenticated");
				this.isAuthenticated = false;
			}
		});
	},
};
</script>
<style scoped></style>
