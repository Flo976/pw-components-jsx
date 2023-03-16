import { C } from "../../vue/helper/V02Component";
import classNames from "classnames";
import {PwInput} from "pw-components-jsx-dev";
import { PwSelect } from "pw-components-jsx-dev";
import { idGenerator } from "pw-components-core-dev";

import {
    isFullZipCode,
    isValidAdress,
    initLocality,
    getZipCode,
    getCity,
    formatCityOptions,
    getParamMap,
    getVille,
    getFullAdress
} from "../../functions/map.js";

var prevPostalCode = null;

export default C.make({
    setAddressJson(addressJSon) {
        this.getData().addressJson = addressJSon;
    },
    getAddressJson() {
        return this.getData().addressJson;
    },
	initData() {
		var { $config } = this;
		var {
			onInit = () => {},
            params = {},
            country = [],
            onChange = () => {},
            onError =() => {}
		} = $config;

        var { attrs={} } = params;
        var { id:elementId } = attrs;

		if (elementId) {
			var input = document.getElementById(elementId);
            
            var searchBox = new google.maps.places.Autocomplete(input);
            if(country && country.length>0){

                searchBox.setComponentRestrictions({
                    country: country,
                });
            }
            searchBox.addListener("place_changed", () => {
                
                var addressJSon = {};
                var checkZipcode = false;
                var ville = "";
                var zipcode = "";
                var street_number = "";
                var places = [searchBox.getPlace()];
                if (!places || places.length == 0) {
                    return;
                }

                if(places[0] && places[0].address_components){
                    for (var i = 0; i < places[0].address_components.length; i++) {
                        for (var j = 0; j < places[0].address_components[i].types.length; j++) {
                            if( places[0].address_components[i].types[j] == "postal_code") {
                                checkZipcode = true;
                            }           
                        }
                    }
                }
                this.getData().valid = true;
                if(!checkZipcode) {
                    this.getData().valid = false;
                    this.setAddressJson({})
                    onChange({instance:this})
                    onError({instance:this})
                    return false;
                }
                places.map((place) => {
                    if (place.geometry === undefined) {
                        return;
                    }

                    var address_components = place.address_components;
                    for (var i = 0; i < address_components.length; i++) {
                        for (
                            var j = 0;
                            j < address_components[i].types.length;
                            j++
                        ) {
                            if (
                                address_components[i].types[j] ==
                                "postal_code"
                            ) {
                                zipcode = address_components[i].long_name;
                            }
                            if (
                                address_components[i].types[j] ==
                                "street_number"
                            ) {
                                street_number =
                                    address_components[i].long_name;
                            }
                        }
                    }
                    
                    //Selection informations villes
                    var locality = getParamMap(address_components, "locality")
                    var administrative_area_level_1 = getParamMap(address_components, "administrative_area_level_1")
                    var administrative_area_level_2 = getParamMap(address_components, "administrative_area_level_2")
                    var country = getParamMap(address_components, "country")
                    var route = getParamMap(address_components, "route")
                    ville = getVille(
                        place, 
                        locality, 
                        administrative_area_level_1, 
                        administrative_area_level_2
                    );

                    addressJSon["street_number"] = street_number;
                    addressJSon["zipcode"] = zipcode;
                    addressJSon["v2_map"] = true;
                    addressJSon["city"] = ville;
                    addressJSon["locality"] = locality;
                    addressJSon["administrative_area_level_1"] = administrative_area_level_1;
                    addressJSon["administrative_area_level_2"] = administrative_area_level_2;
                    addressJSon["country"] = country;
                    addressJSon["route"] = route;

                    addressJSon["lat"] = place.geometry["location"].lat();
                    addressJSon["lng"] = place.geometry["location"].lng();
                    addressJSon["formatted_address"] = place.formatted_address;
                    addressJSon["is_from_map"] = true;
                });
                this.setAddressJson(addressJSon)
                
                setTimeout(()=> {
                    onChange({instance:this})
                },100)
        
            });
			this.getData().searchBox = searchBox;
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
		var { 
            className, 
            wrapperClassName = "",
            params = {}, 
            wrapperParams = {},
            citiesParams = {},
            zipCodeParams = {},
            addressTextParams = {},
            label = "",
            citiesOptions = [],
            customAddressText="L'adresse n'est pas reconnue",
            onChange = () => {},
            onError = () => {}
        } = $config;

        var {
            label:cityLabel=""
        } = citiesParams;

        var {
            label:addressLabel=""
        } = addressTextParams;

        var {
            label:zipCodeLabel=""
        } = zipCodeParams;

        var idAddressText = idGenerator();

        var callBackCity = (result) => {
            if (result) {
                this.config.city = result;
                this.update();
                customSetAddressJson()
            }
        }

        var customSetAddressJson = () =>{
            var full_address = this.config.addressText;
            var postal_code = this.config.zipcode;
            var city = this.config.city;
            if(city){

                var format_rp = getFullAdress(
                    city,
                    postal_code,
                    full_address
                );
                this.setAddressJson(format_rp);
                this.update()
            }
            else{
                this.setAddressJson({});
            }
        }

        var sendRequestCity = (city, postal_code, isNotChange) => {
            var address = `${city}" "${postal_code}`;
            var params = {address: address};
            if (!isNotChange) {
                this.toogleLoading(true);
            }
            getCity(params, callBackCity)
        }

        var callBackPostalCode = (cities) => {
            var full_address = $(".form_edit_info.full_address").val()
            var isValid = isValidAdress(full_address)
            $(".form_edit_info.locality").attr('disabled',null)
            
            if(cities && Array.isArray(cities)){
                citiesOptions = formatCityOptions(cities);
                this.config.citiesOptions = citiesOptions;

                this.refresh();

                if(cities[0]){
                    var city = cities[0];
                    var postal_code = $(".form_edit_info.postal_code").val()
                    $(".form_edit_info.locality").val(city)
                    setTimeout(()=>{
                        sendRequestCity(city, postal_code, true)
                    },100)
                    this.config.messageError=null;
                    this.config.hasError = false;
                    this.update()
                }
            }
        }

        var changeAddressText = (event) => {
            var { currentTarget:event } = event;
            var { value } = event;
            this.config.addressText = value;
            this.refresh();
            customSetAddressJson();
        }

        var loadCity = (event) => {
            var currentTarget = event.currentTarget;
            var currentValue = currentTarget.value;
            if (!isFullZipCode(currentValue)) {
                event.preventDefault()
            }
            clearTimeout(timeout);
            timeout;

            var timeout = setTimeout(() => {
                if(
                    isFullZipCode(currentValue) && 
                    (prevPostalCode != currentValue)
                ){
                    prevPostalCode = currentValue;
                    var address = "France " + prevPostalCode;
                    var params = {address: address};
                    initLocality(".form_edit_info.locality")
                    getZipCode(params, callBackPostalCode)
                }
                else if (!currentValue || !isFullZipCode(currentValue)) {
                    this.setAddressJson({});
                    prevPostalCode = null;
                    $(".form_edit_info.locality").val("")
                    $(".form_edit_info.locality").html('')
                }
                this.config.zipcode = currentValue;
                this.refresh();
                customSetAddressJson();
            },500);
        }

        var customAddressFields = () => {
            var {
                isCustomAddress=false,
                customAddressElements=()=> {
                    return {}
                },
                country
            } = this.config;

            var elements = {
                fullAddressInput: () => {
                    return <PwInput
                        ref={idAddressText}
                        config={{
                            type:"text",
                            ...addressTextParams,
                            isDirect:true,
                            onChange:changeAddressText
                        }}
                    />
                },
                fullAddressLabel: () => {
                    return addressLabel
                },
                fullAddressElement: () => {
                    return <div class="col-md-12">
                        <label class="form-check-label _custom_label">
                            {elements.fullAddressLabel()}
                            {elements.fullAddressInput()}   
                        </label>
                    </div>
                },
                zipcodeInput: () => {
                    return <input 
                        type="text" 
                        class="pw_input custom_input postal_code"  
                        placeholder="Code postal"
                        onChange={loadCity}
                        onClick={loadCity}
                        onInput={loadCity}
                    />
                },
                zipcodeLabel: () => {
                    return zipCodeLabel
                },
                zipCodeElement: () => {
                    return <label class="form-check-label _custom_label pw_input">
                        {elements.zipcodeLabel()}
                        {elements.zipcodeInput()}
                        
                    </label>
                },
                cityInput: () => {
                    return <PwSelect 
                        config={{
                            options:citiesOptions,
                            ...citiesParams
                        }}
                    />
                },
                cityLabel: () => {
                    return cityLabel
                },
                cityElement: () => {
                    return <label class="pw_input">
                        {elements.cityLabel()}
                        {elements.cityInput()}
                    </label>
                },
            }

            var getElements = () => {
                return {
                    ...elements,
                    ...customAddressElements({elements, instance:this, showCustomAddress, customAddressText})
                }
            }
            
            
            var render = () => {
                var elements = getElements();
                return <div 
                        id="google-analayze-complete"
                        class="custom_inputs google-analayze-complete modal_custom_group mx-auto"
                    >
                        <div class="row _full_input_adress">
                            {elements.fullAddressElement()}
                            <div class="col-md-12">
                                <div class="row zip_code_city">
                                    <div class="col-md-6">
                                        {elements.zipCodeElement()} 
                                    </div>
                                    <div class="col-md-6">
                                        {elements.cityElement()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            if(isCustomAddress){
                return render()
            }
        }

        var mapAddressFields = () => {
            var {
                isCustomAddress=false,
                params={},
                customElements=()=>{
                    return {}
                },
            } = this.config;

            var { attrs={} } = params;
            var { id:elementId } = attrs;
            var elements = {
                input: () => {
                    return <PwInput
                        ref="input"
                        config={{
                            isDirect:true,
                            ...$config,
                            onChange:() => {},
                            onError:() => {},
                        }}
                    />
                },
                label: () => {
                    return label
                },
                custom: () => {
                    return <p class="stl-info_address" onClick={showCustomAddress}>
                    <a href="#">{customAddressText}</a>
                </p>
                },
                pwInput: () => {
                    return <label class="pw_input">
                    {elements.label()}
                    {elements.input()}
                </label>
                }
            };

            var getElements = () => {
                return {
                    ...elements,
                    ...customElements({elements, instance:this, showCustomAddress, customAddressText})
                }
            }

            var render = () => {
                var elements = getElements();
                return <div>
                    {elements.pwInput()}
                    {elements.custom()}
                </div>
            }

            if(!isCustomAddress){
                return render()
            }
        }
        var showCustomAddress = () => {
            
            this.config.isCustomAddress = true;
            this.getData().isValid = false;
            this.refresh();
        }

		return (
			<div
				class={classNames(wrapperClassName)}
				{...wrapperParams}
			>
                {mapAddressFields()}
                {customAddressFields()}
			</div>
		);
	},
});
