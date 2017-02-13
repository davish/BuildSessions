/**
 * Created by aryavpal on 1/19/17.
 */

var thisuseriscoming = function (sessionid) {
    return _.contains(BuildSessions.findOne({_id: sessionid}).attend, Meteor.userId());
};

Template.buildSessionList.helpers({
    buildSession: function() {
        return BuildSessions.find({}, {sort: { date : 1 } });
    },
    dateMoment: function(date, st) {
        console.log(st);
        return moment(date.date).add(moment.duration(st)).format('ddd M/D @ h:mm');
    },
    durationMoment: function(st, et) {
        return moment.duration(et).subtract(moment.duration(st)).humanize();
    },
    comingnotcoming: function(sessionid){
        return thisuseriscoming(sessionid)?'not-coming':'coming';
    },
    success: function(sessionid) {
        return thisuseriscoming(sessionid)?'success':'';
    },
    team: function() {
        return Teams;
    },
    queryuser: function(users, teamid) {
        return Meteor.users.find({
            _id: {$in: users},
            profile: {team: teamid}
        }, { username: 1, _id: 0 } );
    },
});

Template.buildSessionList.events({
 //    if(session.attend.includes(e.target.Id) e.gettext == add){
 //  //  if(check(session.attend), Meteor.userId == true){

    'click .not-coming': function(e) {
        e.preventDefault();
        BuildSessions.update({_id: e.target.id}, {$pull: {attend: Meteor.userId()}});
      },

    'click .coming': function (e) {
        e.preventDefault();
      //  n = BuildSessions.findOne(e.target.id);
        BuildSessions.update({_id: e.target.id}, {$push: {attend: Meteor.userId()}});

}
});