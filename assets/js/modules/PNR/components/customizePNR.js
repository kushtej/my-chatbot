Vue.component('customizePNR', {
    props: {
        header: Object,
        data: {
            type: [Array, Object]
        },
    },
    data: function () {
        return {
            lists: [
                {
                    id: 1,
                    name: "English PNR",
                    isFav: false,
                    default: true,
                    viewableFields: [
                        { label: "tag", isDisplayed: true },
                        { label: "id", isDisplayed: false },
                        { label: "patterns", isDisplayed: true },
                        { label: "message", isDisplayed: false },
                        { label: "form", isDisplayed: true },
                        { label: "relatedCRT", isDisplayed: false },
                    ],
                    conditions: {
                        all: [],
                        any: []
                    }
                },
                {
                    id: 2,
                    name: "Hindi PNR",
                    isFav: false,
                    default: true,
                    viewableFields: [
                        { label: "tag", isDisplayed: true },
                        { label: "id", isDisplayed: true },
                        { label: "patterns", isDisplayed: true },
                        { label: "message", isDisplayed: true },
                        { label: "form", isDisplayed: true },
                        { label: "relatedCRT", isDisplayed: true },
                    ],
                    conditions: {
                        all: [],
                        any: []
                    }
                },],
            active: 0,
        }
    },

    created(){
        // this.$root.$emit('customizePNR::list::Active',this.lists[0]);
    },

    methods: {
        activeList(list) {
            this.$root.$emit('customizePNR::list::Active',list);
        },
    },


    template: `
    <div>
        <div class="row">
            <div class="col-3">
                <h4 class="mb-2">Lists 
                    <span><button type="button" class="btn btn-primary float-end m-1">+</button></span>
                </h4>
                <input type="text" class="form-control" placeholder="Search Lists" name="email">
                <div>
                    <h5 class="mt-3">My Lists :</h5>
                    <draggable v-model="lists" group="lists" @start="drag=true" @end="drag=false">
                        <div class="m-2 p-2" style="background-color: #e2e3e5;" v-for="list in lists" :key="list.id">
                            <div @mouseover="active = list.id" @mouseleave="active = 0" @click="activeList(list)">
                                <svg class="bi me-2" width="16" height="16">
                                    <use xlink:href="#grid" />
                                </svg>
                                <span class="ml-2"v-show="active === list.id">
                                    <i class="fa fa-star" style="color : gold" aria-hidden="true"></i>
                                </span>
                                    {{list.name}}
                                <span v-if="list.default" class="float-end mr-2">
                                    <i class="fa fa-check m-2" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>
            <div class="col-9">
                <configureLists></configureLists>
            </div>
        </div>
    </div>
    `,
});

Vue.component('configureLists', {

    data: function () {
        return {
            allFields : [],
            list: {},
            selectedFields: [],
            unselectedFields: [],
            isOptionsOpened: false,
            selected: null,
            search: "",
            isListClicked : false,
        }
    },

    computed: {
        filteredItems() {
            const condition = new RegExp(this.search, "i");
            console.log(condition)
            console.log(this.selectedFields)
            console.log(this.unselectedFields)
            return this.unselectedFields.filter(item => item.match(condition));
        }
    },

    created: function () {

        this.$root.$on('customizePNR::list::Active', (data) => {

            this.clearFields();

            this.list = data;
            this.allFields = this.list.viewableFields.map(field => field.label);
            for(let field of this.list.viewableFields){
                if(field.isDisplayed) {
                    this.selectedFields.push(field.label)
                } else {
                    this.unselectedFields.push(field.label)
                }
            }
        });

    },

    methods: {

        updateMenuStructure() {
            //
        },

        clearFields() {
            this.allFields = []
            this.list= {}
            this.selectedFields= []
            this.unselectedFields= []
            this.isOptionsOpened= false
            this.selected= null
            this.search= ""
        },

        deSelectField(selectedModule) {
            this.selectedFields = this.selectedFields.filter((item) => item.value !== selectedModule.value);
            this.unselectedFields.unshift(selectedModule);
        },

        onInput(value) {
            this.isOptionsOpened = !!value;
            this.selected = null;
        },
        selectField() {
            let selectedOption = this.filteredItems[this.selected];
            this.selectedFields.push(selectedOption)
            this.unselectedFields = this.unselectedFields.filter((item) => item.value !== selectedOption.value);
        },
        onOptionsDown() {
            if (!this.isOptionsOpened)
                return;
            this.selected = (this.selected + 1) % this.filteredItems.length;
        },
        onOptionsUp() {
            if (!this.isOptionsOpened)
                return;
            this.selected = (this.selected - 1 < 0) ? this.filteredItems.length - 1 : this.selected - 1;
        },
        toggleOptions() {
            this.isOptionsOpened = !this.isOptionsOpened;
        },
        onPersanalizeModalClose() {
            //Update the Apps informtaion  in the Menu
            // this.$root.$emit('vds::process::header::app::fields');
        },
    },

    beforeDestroy(){
        console.log("hi")
    },

    template: `

            <div>
                <div class="d-flex align-items-center height-40px bg-grey-hue-11 border-0">
                    <h5 class="mb-0 p-2 pl-3 font-13 f-500">
                        <span>Choose Columns</span>
                        <span class="text-grey-4 ">(~max )</span>
                    </h5>
                </div>

                <div class="p-2 pl-3">
                    <div class="form-inline has-search pl-0 w-50">
                        <p class="control icon-right">
                        <input type="text" class="form-control w-100 h-100 rounded border-grey-1" 
                            placeholder="Search labels"
                            @input="onInput($event.target.value)" 
                            @blur="isOptionsOpened = false" 
                            @keyup.enter="selectField"
                            @keyup.tab="selectField" 
                            @keydown.down="onOptionsDown"
                            @keydown.up="onOptionsUp" 
                            @keyup.esc="isOpen = false"
                            @click="toggleOptions" ref="dropdown" v-model="search" 
                        />
                        </p>

                        <transition name="fade" mode="in-out">
                            <ul v-show="isOptionsOpened" style="list-style-type: none;
                                padding:2px;
                                margin: 0;
                                border: 1px solid #dbdbdb;
                                border-radius: 0 0 3px 3px;
                                max-height: 200px;
                                overflow-y: auto;">
                
                                <div class="form-inline d-flex listColumns d-flex scrollbar scrollbar-default justify-content-around row mb-0 mr-1 bg-white pl-2">
                                    <span v-for="(field,i) in filteredItems" @mouseenter="selected = i" @mousedown="selectField"
                                        :class="{'selected': i === selected}">
                                        <div class="listFieldOption py-1 my-1 bg-grey-hue-9 rounded-4 c-pointer pl-3"
                                            style="width: 200px !important;">
                                            <div class="">{{field}}</div>
                                    </span>
                                </div>
                            </ul>
                        </transition>
                    </div>
                </div>  
          
                <draggable v-model="selectedFields" group="people" @start="drag=true" @end="drag=false">
                    <div class="m-2 p-2 customize-pnr" v-for="element in selectedFields" :key="1">
                        <svg class="bi me-2" width="16" height="16">
                            <use xlink:href="#grid" />
                        </svg>
                        {{element}}
                        <span class="float-end mr-2">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </span>
                    </div>
                </draggable>
            </div>
 
    `,
});

