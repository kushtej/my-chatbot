Vue.component('modal', {
    data() {
        return {
            title : String,
            size : String,
            data : Object
        }
    },
    created() {
        this.$root.$on('showModal', (modalDiscription)=> {
            this.title = modalDiscription.title
            this.size = modalDiscription.size
            this.data = modalDiscription.data

            this.$root.$emit('bv::show::modal','showModal' );  
        });        
    },
    template : `
    <div class="modalContainer">
        <b-modal modal-class="modal-fullscreen" id="showModal" hide-backdrop content-class="shadow" :size=size  :title=title >

        </b-modal>
    </div>`
});