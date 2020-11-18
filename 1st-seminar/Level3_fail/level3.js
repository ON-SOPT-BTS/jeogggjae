const member = require('./member');
const members = require('./member');
const getIndex = require('./module/getIdx')
const randomMatch = require('./module/randomMatch')

const memberindex = getIndex(members);
const group = [];
const groupcount = 6;

const OBidx = memberindex[0];
const YBidx = memberindex[1];

const MixedOBidx = randomMatch.mix(OBidx);
const MixedYBidx = randomMatch.mix(YBidx);

for( var i =0; i < groupcount; i++){
    group.push( {teamNumber: `${i+1}조`, teamMember:[]});
}


var ob_members = [];
var yb_members = [];


// filter OB / YB
members.filter(members =>{
    if(members.status == "OB")
        ob_members.push(members);
    else
        yb_members.push(members);
});




// get index in OB & YB








