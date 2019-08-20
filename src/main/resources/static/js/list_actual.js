function getIndex(list, id) {
    for (var i=0; i < list.length; i++) {
        if (list[i].id == id) {
            return i;
        }
    }

    return -1;
}

var purchaseApi = Vue.resource('/list_view');

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
            '<td>{{ purchase.date | act_date }} </td>' +
            '</tr>' +
            '</table>' +
            '</div>',
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

var app_ = new Vue({
  el: '#app_',
  template: '<purchases-list :purchases="purchases" />',
  data: {
    purchases: []
  }
});