<template>
	<v-container>
		<v-row>
			<v-col>
				<v-card outlined elevation="1">
					<croppa
						v-model="croppaModel"
						:width="260"
						:height="260"
						:canvas-color="'default'"
						:placeholder="'Choose an image'"
						:placeholder-font-size="0"
						:placeholder-color="'default'"
						:accept="'image/*'"
						:file-size-limit="0"
						:quality="2"
						:zoom-speed="3"
						:disabled="false"
						:disable-drag-and-drop="false"
						:disable-click-to-choose="false"
						:disable-drag-to-move="false"
						:disable-scroll-to-zoom="false"
						:disable-rotation="false"
						:prevent-white-space="false"
						:reverse-scroll-to-zoom="false"
						:show-remove-button="true"
						:remove-button-color="'red'"
						:remove-button-size="0"
						@init="handleInitialization"
						@file-choose="handleChosenFile"
						@new-image-drawn="handleNewImage"
						@image-remove="handleImageRemove"></croppa>
					<!-- :initial-image="'path/to/initial-image.png'" -->
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
export default {
	name: "Image-Picker",
	data() {
		return {
			croppaModel: null,
		};
	},
	methods: {
		handleInitialization() {},
		handleChosenFile() {},
		handleImageRemove() {},
		handleNewImage() {
			debugger;
			if (!this.croppaModel.hasImage()) {
				console.log("No image");
				return;
			}
			this.emit("generate", this.croppaModel);
		},
	},
};
</script>
<style></style>
