<template>
	<v-container fill-height fluid class="background">
		<v-row align="center" justify="center">
			<v-col align="center" justify="center" cols="12">
				<v-card class="card-border" width="600px" outlined>
					<v-card-title align="left">PROFILE</v-card-title>
					<v-card-subtitle align="left">
						Here you can change your password or update your info
					</v-card-subtitle>
					<v-card-text class="card-text-border">
						<v-form v-model="valid">
							<v-text-field
								v-model="firstName"
								dense
								label="Name"
								clearble
								type="text"
								outlined></v-text-field>
							<v-text-field
								v-model="lastName"
								dense
								label="Last Name"
								clearble
								type="text"
								outlined></v-text-field>
							<v-text-field
								v-model="email"
								dense
								label="Email"
								clearble
								type="text"
								outlined></v-text-field>
							<v-text-field
								v-model="newPassword"
								dense
								label="Password"
								clearble
								:append-icon="
									showIcon ? 'mdi-eye' : 'mdi-eye-off'
								"
								:rules="[rules.required, rules.min]"
								:type="showIcon ? 'text' : 'password'"
								outlined></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions class="card-actions">
						<v-btn
							:disabled="
								isChangePassButtonDisabled ||
								newPassword == null ||
								!valid
							"
							outlined
							@click="changePassword">
							CHANGE PASSWORD
						</v-btn>
						<v-btn
							:disabled="isOkButtonDisabled || isUserDataSame"
							:loading="!hasDataArrived"
							outlined>
							OK
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import {
	doc,
	db,
	getDoc,
	auth,
	onAuthStateChanged,
	updatePassword,
} from "../../firebase.js";
export default {
	name: "ProfileView",
	components: {},
	watch: {
		newPassword: function (hasValue) {
			debugger;
			if (hasValue) {
				this.isChangePassButtonDisabled = false;
			} else {
				this.isChangePassButtonDisabled = true;
			}
		},
		firstName: {
			handler: function (newValue) {
				this.compareFormData(newValue);
			},
			deep: true,
		},
		lastName: {
			handler: function (newValue) {
				this.compareFormData(newValue);
			},
			deep: true,
		},
		email: {
			handler: function (newValue) {
				this.compareFormData(newValue);
			},
			deep: true,
		},
	},
	data() {
		return {
			valid: null,
			user: null,
			firstName: null,
			lastName: null,
			email: null,
			newPassword: null,
			compareData: null,
			userData: null,
			hasDataArrived: false,
			isOkButtonDisabled: false,
			isUserDataSame: true,
			isChangePassButtonDisabled: true,
			showIcon: false,
			rules: {
				required: (value) => !!value || "Required.",
				min: (v) => v?.length >= 6 || "Min 6 characters",
				email: (v) =>
					!v ||
					/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
					"E-mail must be valid",
			},
		};
	},
	methods: {
		compareFormData() {
			if (
				this.userData.FirstName == this.firstName &&
				this.userData.LastName == this.lastName &&
				this.userData.Email == this.email
			) {
				this.isUserDataSame = true;
			} else {
				this.isUserDataSame = false;
			}
		},
		async getUserData(email) {
			const docRef = doc(db, "users", email);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				let data = docSnap.data();
				this.userData = data;
				this.firstName = this.userData.FirstName;
				this.lastName = this.userData.LastName;
				this.email = this.userData.Email;

				this.hasDataArrived = true;
			} else {
				this.hasDataArrived = false;
			}
		},
		changePassword() {
			if (this.newPassword == null || this.valid != true) {
				return;
			}
			this.isChangePassButtonDisabled = true;
			updatePassword(this.user, this.userData.newPassword)
				.then(() => {
					this.isChangePassButtonDisabled = false;
					console.log("Password updated successfully");
				})
				.catch((error) => {
					this.isChangePassButtonDisabled = false;
					//TODO: handle auth/requires-recent-login
					console.log("Password update error ", error);
				});
		},
	},
	beforeCreate() {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				this.user = user;
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				this.getUserData(user.email);
			} else {
				// User is signed out
				// ...
			}
		});
	},
	created() {
		console.log(this.userDataArrived);
	},
	mounted() {
		debugger;
		console.log(this.userDataArrived);
	},
	destroyed() {},
};
</script>
<style src="../assets/css/main.css"></style>
