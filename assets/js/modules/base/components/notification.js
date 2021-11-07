Vue.component('notification', {
    data() {
        return {
            // title : String,
            // size : String,
            // data : Object,
            notificationTemplate : ""
        }
    },
    created() {
        this.$root.$on('trigger::notification', this.getNotifcationTemplate);

        // $(document).ready(function(){
        //     // $('.toast').toast({
        //     //     delay: 2000,
        //     //     // autohide : false
        //     // });
        //     $('.toast').toast('show');
            
        // })
    },
    methods: {
        getNotifcationTemplate : function(notificationData) {
            let notificationClass = "";

            if(notificationData.type === 'success') {
                notificationClass = ("bg-success text-white");

            } else if(notificationData.type === 'error') {
                //
            }

            this.notificationTemplate = 
            `
            <div class="toast align-items-center ${notificationClass}" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        ${notificationData.message}
                    </div>
                    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
            `
            this.showNotification();
        },

        showNotification : function() {
            $(document).ready(function(){   $('.toast').toast('show');   });
        }
    },

    template : 
    `
    <div class="toast-container position-absolute top-0 end-0 p-3">

        <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    Hello, world! This is a toast message.
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>


        <div class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive"
            aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    Hello, world! This is a toast message.
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                    aria-label="Close"></button>
            </div>
        </div>


        <div v-html="notificationTemplate"></div>

    </div>
    
    `
});
