import { C } from "../../vue/helper/V02Component";
import styles from "./PwDropzone.scss?module";
import classNames from "classnames";
import { getData } from "pw-components-core-dev";
import { Dropzone } from "dropzone";

import "dropzone/dist/basic.css";
import "dropzone/dist/dropzone.css";

export default C.make({
	initDropzone() {
		var { $config = {} } = this;

		var {
			uploadUrl = "",
			removeUrl = "",
			deleteLabel = "Supprimer",
			dropLabel = "Veuillez deposer des fichiers ici ...",
			maxFiles = null,
			dropzoneParams = {},
			template,
			onSending = () => {},
			onSuccess = () => {},
			onAddedFile = () => {},
			onInit = () => {},
		} = $config;

		var { pw_dropzone } = this.$refs;

		var previewTemplate = this.$refs.template.innerHTML;

		var cnf = {
			url: uploadUrl,
			addRemoveLinks: true,
			dictRemoveFile: deleteLabel,
			dictDefaultMessage: dropLabel,
			dictMaxFilesExceeded: "Impossible de charger le document",
			dictCancelUpload: "Annuler",
			maxFiles,
			init: () => {
				setTimeout(() => {
					dropzone.on("sending", (file, xhr, formData) => {
						onSending({file, xhr, formData});
					});
					dropzone.on("success", (file, responseText) => {
						this.uploadFiles(file, responseText);
						onSuccess({file, responseText});
					});
					dropzone.on("addedfile", (file) => {
						onAddedFile({file});
					});
					this.getFiles();
					onInit({ instance: this, dropzone });
				}, 10);
			},
			removedfile: (file) => {
				file.previewElement.remove();

				if (file.previewElement.id) {
					this.removeFiles(file.previewElement.id, file);
				}
			},
			...dropzoneParams,
		};

		if (template) {
			cnf.previewTemplate = previewTemplate
		}

		var instance = this;
		var dropzone = new Dropzone(pw_dropzone, cnf);

		this.getData().dropzone = dropzone;
	},
	getFiles() {
		var { $config } = this;

		var { filesUrl = "" } = $config;

		if (!filesUrl) {
			return true;
		}

		$.ajax({
			url: filesUrl,
			type: "POST",
			data: {},
		}).always((response) => {
			if (response && response.length) {
				$.each(response, (key, value) => {
					var mockFile = {
						name: value.name,
						size: value.size,
						accepted: true,
					};
					mockFile.dataURL = this.imgThumbnailD(
						value.name,
						value.url
					);
					this.getData().dropzone.files.push(mockFile);
					this.getData().dropzone.emit("addedfile", mockFile);
					this.createThumbnail(mockFile);
					this.getData().dropzone.emit("complete", mockFile);
					this.getData().dropzone._updateMaxFilesReachedClass();
					mockFile.previewElement.id = value.id;
					mockFile.previewElement.addEventListener(
						"click",
						function () {
							window.open(value.url, "_blank");
						}
					);
				});
			}
		});
	},
	imgThumbnailD(filename, img) {
		var ext = this.checkFileExt(filename); // Get extension
		if (ext == "mp4") {
			filename = "/assets/images/thumbs/video.png";
		} else if (ext == "pdf") {
			filename = "/assets/images/thumbs/pdf.png";
		} else if (ext == "jpg" || ext == "jpeg" || ext == "png") {
			if (typeof img == "function") {
				filename = img();
			} else {
				filename = img;
			}
		} else {
			filename = "/assets/images/thumbs/default_attachment.jpg";
		}
		return filename;
	},
	checkFileExt(filename) {
		filename = filename.toLowerCase();
		return filename.split(".").pop();
	},
	createThumbnail(temp) {
		this.getData().dropzone.createThumbnailFromUrl(
			temp,
			this.getData().dropzone.options.thumbnailWidth,
			this.getData().dropzone.options.thumbnailHeight,
			this.getData().dropzone.options.thumbnailMethod,
			true,
			(thumbnail) => {
				this.getData().dropzone.emit("thumbnail", temp, thumbnail);
				this.getData().dropzone.emit("complete", temp);
			}
		);
	},
	removeFiles(id, file) {
		var { $config } = this;

		var { removeUrl = "", onRemove = () => {} } = $config;

		if (id && removeUrl) {
			$.ajax({
				type: "post",
				url: removeUrl,
				data: { id: id },
				success: (response) => {
					// TO DO
					//this.getData().dropzone.removeFile(file);
					onRemove({ instance: this, response });
				},
			});
		}
	},
	uploadFiles(file, response) {
		var ext = this.checkFileExt(file.name); // Get extension
		var newimage = this.imgThumbnailD(file.name, () => {
			return URL.createObjectURL(file);
		});
		file.dataURL = newimage;
		this.createThumbnail(file);
		if (response && response != null) {
			var result = response.find((x) => x.name == file.name);
			if (result) {
				if (result.id) {
					file.previewElement.id = result.id;
				}
				if (result.new_tab) {
					file.previewElement.addEventListener("click", function () {
						window.open(result.url, "_blank");
					});
				}
			}
		}
	},
	onReady() {
		var { ready } = this.getData();

		if (!ready) {
			this.getData().ready = true;
			setTimeout(() => {
				this.initDropzone();
			}, 100);
		}
	},
	$render() {
		this.onReady();
		var { $config } = this;

		var { content, className = "", template } = $config;

		return (
			<div class={classNames(className)}>
				<div
					ref="pw_dropzone"
					class="pw_dropzone dropzone"
				></div>
				<div ref="template" class="d-none">
					{ template }
				</div>
			</div>
		);
	},
});
