Vue.component("headers", {
	data: function () {
		return {
			module: 'pnr',
			dashboard: false,
			pnr: true,
			transcripts: false,
		}
	},

	created() {
      //
	},

	methods: {
		moduleActive: function (event) {
			if (this.module !== event.target.name) {
				$('.nav a').removeClass('active');
				event.target.classList.toggle('active')
				this.module = event.target.name
			}
		},
	},
	template:
		`
    
    <div class="main-container">
      <div class="row">
         <div class="col-md-auto">
            <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
               <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                  <svg class="bi me-2" width="40" height="32">
                     <use xlink:href="#bootstrap" />
                  </svg>
                  <span class="fs-4">Dashboard</span>
               </a>
               <hr>
               <ul class="nav nav-pills flex-column mb-auto">
                  <li>
                     <a class="nav-link link-dark"  name="dashboard"
                     v-on:click="moduleActive($event),
                        dashboard = true, 
                        pnr = false"              
                     >
                        <svg class="bi me-2" width="16" height="16">
                           <use xlink:href="#speedometer2" />
                        </svg>
                        Dashboard
                     </a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link link-dark active" aria-current="page" name="pnr"
                     v-on:click="moduleActive($event),
                        dashboard = false, 
                        pnr = true"                  
                     >
                        <svg class="bi me-2" width="16" height="16">
                           <use xlink:href="#table" />
                        </svg>
                        Add Patterns
                     </a>
                  </li>
                  <li>
                     <a href="#" class="nav-link link-dark">
                        <svg class="bi me-2" width="16" height="16">
                           <use xlink:href="#grid" />
                        </svg>
                        View Transcripts
                     </a>
                  </li>
               </ul>
               <hr>
               <div class="dropdown">
                  <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2"
                     data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/kushtej.png" alt="" width="32" height="32" class="rounded-circle me-2">
                  <strong>kushtej</strong>
                  </a>
                  <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                     <li><a class="dropdown-item" href="#">Settings</a></li>
                     <li><a class="dropdown-item" href="#">Profile</a></li>
                     <li>
                        <hr class="dropdown-divider">
                     </li>
                     <li><a class="dropdown-item" href="#">Sign out</a></li>
                  </ul>
               </div>
            </div>
         </div>
         <div class="col mt-3">

         <div v-if="dashboard">
            <dashboardModule :module="module"></dashboardModule>
         </div>

         <div v-if="pnr">
               <pnrModule :module="module"></pnrModule>
         </div>
         </div>
         <deleteConformation :module="module"></deleteConformation>
         <modal :module="module"></modal>
         <notification :module="module"></notification>
      </div>
   </div>
   `,
})
