export const replaceValidate = {
    data() {
        return {
            isErrorForm: false,
        }
    },

    methods: {
        replaceMessage(FormErr, ValidatesArr) {
            Object.keys(FormErr).forEach(function(key) {
                FormErr[key] = ''
            });
        
            ValidatesArr.forEach((item, index) => {
                if(FormErr[item.$property] != undefined) {
                    let property_uppercase =  item.$property[0].toUpperCase() +  item.$property.slice(1);
                    let replace_message = item.$message.replace('Value', property_uppercase);
                    FormErr[item.$property] = replace_message ? replace_message : ''
                }
            });
        
            return FormErr
        },

        resetValidate(FormErr) {
            let FormReset = {}
        
            Object.keys(FormErr).forEach(function(key) {
                FormReset[key] = ''
            })
        
            return FormReset
        
        },
    }
  }


  