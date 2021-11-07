Vue.component('notification', {
    data() {
        return {
            notificationTemplate : ""
        }
    },
    created() {
        this.$root.$on('trigger::notification', this.getNotifcationTemplate);
    },
    methods: {
        getNotifcationTemplate : function(notificationData) {
            let notificationClass = "";

            if(notificationData.type === 'success') {
                notificationClass = ("bg-success text-white");

            } else if(notificationData.type === 'error') {
                notificationClass = ("bg-danger text-white");
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
            this.showNotification(notificationData);
        },

        showNotification : function(notificationData) {
            $(document).ready(function(){
                $('.toast').toast(notificationData);
                $('.toast').toast('show');
            });
        }
    },

    template : 
    `
    <div class="toast-container position-absolute top-0 end-0 p-3">
        <div v-html="notificationTemplate"></div>
    </div>
    `
});
