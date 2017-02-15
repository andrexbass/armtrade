Template.topnavbar.helpers({
    sectionTitle: function () {
        return Router.current().route.options.sectionTitle;
    }
});

Template.topnavbar.events({
    'click .language-list a' : function(event){
        $('.button-loc').html(
            '<img src="/img/loc-' + event.currentTarget.attributes['data-set-lang'].value + '.png">'
        );
    }
});