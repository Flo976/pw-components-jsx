import { C } from "../../vue/helper/V02Component";
import classNames from "classnames";
import styles from "./PwMap.scss?module";

//https://developers.google.com/earth-engine/apidocs/map-setcenter
//https://developers.google.com/maps/documentation/javascript/reference#LatLngLiteral
//https://stackoverflow.com/questions/2773263/google-maps-setcenter
export default C.make({
	addMarker(params = {}) {
		var { map } = this.getData();
		var {
			latitude,
			longitude,
			icon = {
				url: "../../images/map/marker.png", // url
				scaledSize: new google.maps.Size(21.109, 29.692), // scaled size
				origin: new google.maps.Point(0, 0), // origin
				anchor: new google.maps.Point(0, 0), // anchor
			},
		} = params;

		var marker = new google.maps.Marker({
			position: { lat: latitude, lng: longitude },
			map: map,
			icon: icon,
		});
		return marker;
	},
	initData() {
		var { mapElement } = this.$refs;
		var { $config } = this;
		var {
			latitude,
			longitude,
			zoom = 10,
			onInit = () => {},
			mapConfig = {},
		} = $config;
		if (mapElement) {
			var mc = {
				...mapConfig,
			};
			var map = new google.maps.Map(mapElement, mapConfig);
			if (latitude && longitude) {
				map.setCenter(new google.maps.LatLng(latitude, longitude));
			}
			if (zoom) {
				map.setZoom(zoom);
			}
			this.getData().map = map;
			onInit(this);
		}
	},
	onReady() {
		var { ready = false } = this.getData();
		if (!ready) {
			this.getData().ready = true;
			setTimeout(() => {
				this.initData();
			}, 100);
		}
	},

	$render() {
		this.onReady();
		var { $config } = this;
		var { className, params = {} } = $config;

		return (
			<div
				class={classNames("pw_map", className)}
				ref={"mapElement"}
				{...params}
			>
				MAP
			</div>
		);
	},
});
