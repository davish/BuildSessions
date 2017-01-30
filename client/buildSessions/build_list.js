/**
 * Created by aryavpal on 1/19/17.
 */
Template.buildSessionList.helpers({
    buildSession: function() {
        return BuildSessions.find();
    }
});
Template.buildSessionList.events({
    'click .coming': function (e){
        e.preventDefault();
        if(e.session.attend.includes(e.target.id) &&  e.gettext == add) {
            // var session = BuildSessions.findOne(e.target.id);
            BuildSessions.update({_id: e.target.id}, {$push: {attend: Meteor.userId()}});
        }
    }
});