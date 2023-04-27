<template>
	<v-container fill-height fluid class="background">
		<v-row align="center" justify="center">
			<v-col align="center" justify="center" cols="12">
				<v-card class="card-border" width="600px" outlined>
					<v-card-title align="left">NEW ANIMAL</v-card-title>
					<v-card-subtitle align="left"></v-card-subtitle>
					<v-card-text class="card-text-border">
						<image-picker @generate="generateBlob"></image-picker>
					</v-card-text>
					<v-card-actions class="card-actions"></v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
import ImagePicker from "../components/ImagePicker.vue";
import {
	storage,
	ref,
	doc,
	getDownloadURL,
	addDoc,
	uploadBytes,
	db,
} from "../../firebase";
import { collection, updateDoc } from "firebase/firestore/lite";

export default {
	name: "New-Animal-View",
	components: {
		ImagePicker,
	},
	data() {
		return {
			imageBinary: null,
			type: null,
			name: null,
			breed: null,
			age: null,
			arrived: null,
			sex: null,
			height: null,
			weight: null,
			description: null,
			isChipped: null,
			isSterilized: null,
			isVaccinated: null,
			animalTypes: ["Dog", "Cat"],
			sexTypes: ["Male", "Female"],
			dateLabel: "When has it arrived at the shelter?",
			user: null,
			email: null,
			downloadedImageUrl: null,
			animalDocReference: null,
			isLoading: null,
		};
	},
	methods: {
		async generateBlob(croppaModel) {
			let blob = await croppaModel.promisedBlob();
			this.imageBinary = blob;
			console.log("Blob: ", blob);
		},
		clear() {
			this.imageBinary = null;
			this.type = null;
			this.name = null;
			this.breed = null;
			this.age = null;
			this.arrived = null;
			this.sex = null;
			this.height = null;
			this.weight = null;
			this.description = null;
			this.isChipped = null;
			this.isSterilized = null;
			this.isVaccinated = null;
		},
		async submit() {
			if (this.imageBinary == null) {
				console.log("No image");
				return;
			}
			this.isLoading = true;
			await this.createAnimal();
			this.uploadAnimalImage();
		},
		postActionMoveToView() {
			this.$router.push({ path: "/animals" });
		},
		uploadAnimalImage() {
			const imageName = "images/" + this.email + Date.now();
			const imageRef = ref(storage, imageName);
			const file = this.imageBinary;
			uploadBytes(imageRef, file).then((snapshot) => {
				console.log("Uploaded a blob or a file ", snapshot);
				getDownloadURL(imageRef)
					.then((url) => {
						this.downloadedImageUrl = url;
						this.updateAnimalPickerReference(url);
						console.log("File saved successfully at ", url);
						this.postActionMoveToView();
					})
					.catch((error) => {
						switch (error.code) {
							case "storage/object-not-found":
								break;
							case "storage/unauthorized":
								break;
							case "storage/canceled":
								break;
						}
					});
			});
		},
		async updateAnimalPickerReference() {
			let docReference = this.animalDocReference;
			let imageUrl = this.downloadedImageUrl;
			let response = await updateDoc(
				doc(db, "animals", docReference.id),
				{
					ImageUrl: imageUrl,
				}
			);
			this.isLoading = false;
		},
		async createAnimal() {
			let animalDocReference = await addDoc(collection(db, "animals"), {
				Type: this.type,
				Name: this.name,
				Breed: this.breed,
				Age: this.age,
				Arrived: this.arrived,
				Sex: this.sex,
				Height: this.height,
				Weight: this.weight,
				Description: this.description,
				IsChipped: this.isChipped,
				IsSterilized: this.isSterilized,
				IsVaccinated: this.isVaccinated,
				ImageUrl: null,
			});
			this.animalDocReference = animalDocReference;
		},
	},
	mounted() {
		debugger;
	},
};
</script>
<style></style>
