Vue.component('modal', {
    data() {
        return {
            title : String,
            size : String,
            data : Object,
            component : String,
        }
    },
    created() {
        this.$root.$on('showModal', (modalDiscription)=> {
            this.title = modalDiscription.title
            this.size = modalDiscription.size
            this.data = modalDiscription.data
            this.component = modalDiscription.component;

            this.$root.$emit('bv::show::modal','showModal' );  
        });        
    },
    template : `
    <div class="modalContainer">
        <b-modal modal-class="modal-fullscreen" id="showModal" hide-backdrop content-class="shadow" :size=size  :title=title >
            <component :is="component" :record=data ></component>
        </b-modal>
    </div>`
});