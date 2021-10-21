Vue.component('displayPNR', {
    props:{
        header:Object,
        record:{
            type : [Array, Object]
        },
    },
  template: `
    <div>
        {{record}}
    </div>`,
})
