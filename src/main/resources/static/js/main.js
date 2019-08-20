function getIndex(list, id) {
    for (var i=0; i < list.length; i++) {
        if (list[i].id == id) {
            return i;
        }
    }

    return -1;
}

var purchaseApi = Vue.resource('/buy{/id}');

Vue.component('purchase-form', {
    props: ['purchases', 'purchaseAttr'],
    data: function(){
        return {
            buy: '',
            type: '',
            price: '',
            date: '',
            id: ''
        }
    },
    watch: {
        purchaseAttr: function(newVal, oldVal) {
            this.buy = newVal.buy;
            this.type = newVal.type;
            this.price = newVal.price;
            this.date = newVal.date;
            this.id = newVal.id;
        }
    },
    template:
        '<div align="center">' +
        '<table>' +
           '<tr>' +
             '<td><input type="text" required placeholder="Покупка" v-model="buy"/></td>' +
             '<td><input type="text" list="typ" placeholder="Тип покупки" v-model="type"/>' +
             '<datalist id="typ">' +
             '<option value="разовая" label="Неповторяющаяся покупка">' +
             '<option value="периодическая" label="Регулярная покупка">' +
             '</datalist></td>' +
             '<td><input type="text" required placeholder="Цена" v-model="price"/></td>' +
             '<td><input type="date" required value="2019-09-01" v-model="date"/></td>' +
             '<td><input type="button" value="Обработать" @click="click"/></td>' +
           '</tr>' +
         '</table>' +
         '</div>'
        ,
        methods: {
            click: function() {
                var purchase = { buy: this.buy , type: this.type , price: this.price , date: this.date};

                if (this.id) {
                    purchaseApi.update({id: this.id}, purchase).then(result =>
                        result.json().then(data => {
                            var index = getIndex(this.purchases, this.data.id);
                            this.purchases.splice(index, 1, data);
                            this.buy = ''
                            this.type = ''
                            this.price = ''
                            this.date = ''
                            this.id = ''
                        })
                    )
                } else {
                    purchaseApi.save({}, purchase).then(result =>
                                        result.json().then(data => {
                                            this.purchases.push(data);
                                            this.buy = ''
                                            this.type = ''
                                            this.price = ''
                                            this.date = ''
                                        })
                                    )
                }

            }
        }
})

Vue.component('purchase-row' , {
props: ['purchase', 'editMethod', 'purchases'],
    template:'<div style="width: 100%; width: 1500px;">' +
            '<table>' +
            '<tr>' +
            '<td><h5>ПОКУПКА</h5></td>' +
            '<td><h5>ТИП</h5></td>' +
            '<td><h5>ЦЕНА</h5></td>' +
            '<td><h5>ДАТА</h5></td>' +
            '</tr>' +
            '<tr>' +
            '<td><i> • &#160;  {{ purchase.buy }}</i></td>' +
            '<td>{{ purchase.type }}</td>' +
            '<td><i>( {{ purchase.price }} )</i></td>' +
            '<td>{{ purchase.date }} </td>' +
            '<td><input type="button" style="font-size: 12px; margin: 5px; text-align: right" value="Изменить" @click="edit" /></td>' +
            '<td><input type="button" style="font-size: 12px; margin: 5px; text-align: right" value="Удалить" @click="del" /></td>' +
            '</tr>' +
            '</table>' +
            '</div>',

    methods: {
        edit: function() {
            this.editMethod(this.purchase);
        },
        del: function() {
            purchaseApi.remove({id: this.purchase.id}).then(result => {
                if (result.ok) {
                    this.messages.splice(this.purchases.indexOf(this.purchase), 1)
                }
            })
            this.startComponent();
        }
    }
});

Vue.component('purchases-list', {
  props: ['purchases'],
  data: function() {
    return {
        purchase: null
    }
  } ,
  template: '<div style="position: relative; width: 300px;"><purchase-form :purchases="purchases" :purchaseAttr="purchase" /><purchase-row v-for="purchase in purchases" :key="purchase.id" :purchase="purchase" :editMethod="editMethod" :purchases="purchases" /></div>'
  ,
  created: function() {
    purchaseApi.get().then(result =>
        result.json().then(data =>
            data.forEach(purchase => this.purchases.push(purchase))
        )
    )
  },
  methods: {
    editMethod: function(purchase) {
        this.purchase = purchase;
    }
  }
});

var app = new Vue({
  el: '#app',
  template: '<purchases-list :purchases="purchases" />',
  data: {
    purchases: []
  }
});