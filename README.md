# pw-components-jsx-dev

## Installation

* Avec yarn:
```
yarn add pw-components-js-dev
```

* Avec npm:
```
npm install pw-components-js-dev
```

## Utilisation

```javascript
git clone https://github.com/Flo976/IAEplateforme.git -b prepare2/sf/PW-115
```

### DatatableObject

DatatableObject permet de definir les proprietés du tableau

#### Etape 1 : Instanciation

```javascript
import {DatatableObject as Datatable} from "pw-components-jsx-dev";

var datatable = new Datatable();
```

#### Etape 2 : Définition des entêtes

```javascript
datatable.head.fields = [
	{
			key: "firstname",
			text: "Prénom",
	},
	{
			key: "email",
			text: <u>Email</u>,
			render: this.orderable,
	},
	{
			key: "phone",
			text: "Phone"
			render: ({ getText, field, datatable }) => {
				return (
					<th class={Style.sorting}>
						<i>{getText()}</i>
					</th>
				);
			}
	},
];
```

#### Etape 3 : Définition des actions

Les actions sont dans la propriété head du datatable

```javascript
datatable.head.fields = [
	{
		text: "Actions",
		renderBody: ({ line }) => {
			return (
				<td>
					<span
						class="btn btn-primary"
						onClick={() => {
							alert(`Modification de ${line.firstname}`);
						}}
					>
						Modifier
					</span>
					<span
						class="btn btn-danger"
						onClick={() => {
							alert(`Suppression de ${line.firstname}`);
						}}
					>
						Supprimer
					</span>
				</td>
			);
		},
	},
];
```

#### Etape 4 : Définition des propriétés facultatives
```
// Nombre de line par page
datatable.pagination = 10

// Page actuelle
datatable.activePage = 1

// URL de recuperation des données
datatable.url = window.test_api_listing
```

#### Etape 5 : Personnalisation du design de la table

```javascript
datatable.render = ({ head, body, Style:Stl }) => {
	return (
		<table class={classNames(Stl.table, "votre_class")}>
			{head()}
			{body()}
		</table>
	);	
}
```

#### Etape 6 : Exemple d’utilisation 

```javascript
import Style from "./LIST_USER_TABLE.scss?module";
import classNames from "classnames";
import {DatatableObject as Datatable} from "pw-components-jsx-dev";
import {Datatable as Dt} from "pw-components-jsx-dev";
class LIST_USER_TABLE {
	static datatable
	static getMethods() {
		return {
    		...Dt.getMethods(),
			setupTable() {
				if(LIST_USER_TABLE.datatable){
					return LIST_USER_TABLE.datatable
				}
				var datatable = new Datatable();
				
				LIST_USER_TABLE.datatable = datatable
				
				datatable.instance = this;
				datatable.head.fields = [
					{
						key: "firstname",
						text: "Prénom",
						render: this.orderable,
					},
					{
						key: "email",
						text: "Email",
						render: this.orderable,
					},
					{
						key: "phone",
						text: <u>phone</u>,
						render:this.orderable
					},
					{
						text: "Actions",
						renderBody: ({ line }) => {
							return (
								<td>
									<span
										class="btn btn-primary"
										onClick={() => {
									        alert(
												`Modification de ${line.firstname}`
											);
										}}
									>
										Modifier
									</span>
									<span
										class="btn btn-danger"
										onClick={() => {
											alert(
												`Suppression de ${line.firstname}`
											);
										}}
									>
										Supprimer
									</span>
								</td>
							);
						},
					},
				];

				datatable.render = ({ Style:Stl, head, body }) => {
					return (
						<table class={classNames(Stl.table, Style.table)}>
							{head()}
							{body()}
						</table>
					);	
				}

				datatable.pagination = 10
				datatable.activePage = 1
				datatable.url = window.test_api_listing

				return datatable;
			},
		};
	}
}

export default LIST_USER_TABLE;
```
###### Utilisation datatable sur le composant

```javascript
import { C } from "vue/helper/V01Component.jsx";
import classNames from "classnames";
import Components from "common/classes/Components.jsx";
import LIST_USER_TABLE from "common/structure/TABLE/LIST_USER_TABLE.jsx";

import PwLoading from "vue/components/core/PwLoading/PwLoading.jsx";

export default C.make({
    ...Components.getMethods(),
    ...LIST_USER_TABLE.getMethods(),
    $render() {
        var datatable = this.setupTable();

        return (
            <div class={classNames("")}>
                <div class="p-3">
                    <div class="row">
                        <div class="col-12">
                            <div class="position-relative">
                                {this.drawTable(datatable)}
                                <PwLoading
                                    ref="loading"
                                    config={{
                                        isVisible: datatable.isLoading,
                                        hasConfig:true
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});
```


###### Utilisation de recherche sur datatable

```javascript
var {
    search,
} = this.config;

search.onSearch = (params = {}) => {
    var { value } = params;
    datatable.activePage = 1;
    datatable.key = value;
    datatable.load();
};

<div class="col-3">{this.$search(search)}</div>
```


###### Utilisation de filtrage sur datatable

```javascript
import MODAL_USER_FILTER from "common/structure/TABLE/modal/MODAL_USER_FILTER.jsx";

var {
    fieldFilter,
} = this.config;

var datatable = this.setupTable();
        
var openModalFilter = () => {
    var modal = showModal(MODAL_USER_FILTER, {
        fieldFilter,
        datatable,
    });
};
var resetFilters = () => {
      datatable.activePage = 1;
      datatable.filters = "";
      datatable.load();
  };

var renderButtonFilter = () => {
    var reset = () =>{
        if (datatable.filters && datatable.filters.length) {
            return (
                <button class="btn btn-secondary" onClick={resetFilters}>
                    Annuler les filtres
                </button>
            );
        }
        return null;
    }
    return (
        <span>
            <button class="btn btn-primary" onClick={openModalFilter}>
                Filter
            </button>
            {reset()}
        </span>
    );
};

<div class="col-9">
    {renderButtonFilter()}
</div>
```

###### Modal de filtrage

```javascript
import { C } from "vue/helper/V01Component.jsx";
import classNames from "classnames";
import { PwModalMethodes } from "common/functions/modal/PwModalMethodes.jsx";
import Components from "common/classes/Components.jsx";

export default C.make({
    ...Components.getMethods(),
	...PwModalMethodes.getMethodsJsx(),
	
	$render() {
        var {
            fieldFilter,
            datatable,
        } = this.config;
        var {
        	category
        } = fieldFilter

        var applyFilter = () => {
        	var categoryInstance = category;
        	var run = () =>{
	            var category = categoryInstance.value;
	            var subcategory = $('[name="mf_subcategory"]').val();

	            var filters = [];

	            if (category && category.length) {
	                filters.push({ category });
	            }

	            if (subcategory && subcategory.length) {
	                filters.push({ subcategory });
	            }

	            datatable.activePage = 1;
	            datatable.filters = json_encode(filters);
	            datatable.load();

	            hideModalFilter();
        	}

        	run()
        };

        var hideModalFilter = () => {

        	this.$$$hide();
        };
		return (
			<div class="modal fade" ref="modal" tabindex="-1" role="dialog" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title">Filtrage</h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			        <form action="#">
                        <div class="my-1">
                        	{this.$select(category)}
                                            
                        </div>
                        <div class="my-1">
                            <label
                                class="mr-sm-2"
                                for="inlineFormCustomSelect"
                            >
                                Sous-catégorie
                            </label>
                            <select
                                ref="mf_subcategory"
                                class="custom-select mr-sm-2"
                                name="mf_subcategory"
                            >
                                <option value="">
                                    Tous les sous-catégories
                                </option>
                                <option value="id-sub-category-1">
                                    Maths
                                </option>
                                <option value="id-sub-category-2">
                                    A
                                </option>
                                <option value="id-sub-category-3">
                                    B
                                </option>
                            </select>
                        </div>
			        </form>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        onClick={applyFilter}
                    >
                        Filtrer
                    </button>
			      </div>
			    </div>
			  </div>
			</div>
		);
	},
});
```


###### Utilisation modal d’ajout sur datatable

```javascript
import MODAL_CREATE_USER from "common/structure/TABLE/modal/MODAL_CREATE_USER.jsx";

var {
    fieldCreate,
    buttonCreate
} = this.config;

var datatable = this.setupTable();

var openModalAjouter = () => {
    var modal = showModal(MODAL_CREATE_USER, {
        fieldCreate,
        buttonCreate,
    });
};

<div class="col-9">
    <span
        class="btn btn-primary"
        onClick={openModalAjouter}
    >
        Ajouter
    </span>
</div>
```
###### Modal d’ajout

```javascript
import { C } from "vue/helper/V01Component.jsx";
import classNames from "classnames";
import { PwModalMethodes } from "common/functions/modal/PwModalMethodes.jsx";
import Components from "common/classes/Components.jsx";

export default C.make({
    ...Components.getMethods(),
	...PwModalMethodes.getMethodsJsx(),
	
	$render() {
        var {
            fieldCreate,
            buttonCreate:button,
            search,
        } = this.config;
        var {
        	firstname,
            lastname,
            email,
            phone,
            password,
            confirmPassword
        } = fieldCreate
		return (
			<div class="modal fade" ref="modal" tabindex="-1" role="dialog" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title">Ajouter un utilisateur</h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			        <form action="#">
                        {this.$input(lastname)}
                        {this.$input(firstname)}
                        {this.$phone(phone)}
                        {this.$input(email)}
                        {this.$password(password)}
                        {this.$password(confirmPassword)}
			        </form>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
			        
                    {this.$button(button)}
			      </div>
			    </div>
			  </div>
			</div>
		);
	},
});
```



## Dépendances

```
javascript
- @babel/polyfill

- @vue/babel-helper-vue-jsx-merge-props

- @vue/babel-preset-jsx

- classnames

- core-js

- @babel/cli

- @babel/core

- @babel/preset-env
```