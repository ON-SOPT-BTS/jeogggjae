const members = require('./member')
const members_OB = [];
const members_YB = [];
const group = [];

// OB,YB 분류하기
members.filter(members => {
    if(members.status == 'OB')
        members_OB.push(members);
    else
        members_YB.push(members);
})


// 배열을 랜덤하게 섞어주는 함수
const shuffle = (memberArray) => {
    memberArray.sort(() => Math.random() - 0.5);
    return memberArray;
}


// 팀 랜덤하게 섞어주는 함수
const matchingTeam = (team_length) => {
    const shuffledOB = shuffle(members_OB);
    const shuffledYB = shuffle(members_YB);

    final_team = [];

    for( i=0; i<team_length; i++){
        final_team[`${i + 1}조`] = [];
    }

    shuffledOB.map((member) => {
    let num = shuffledOB.indexOf(member) % team_length;
    final_team[`${num + 1}조`].push(member);
    });

    shuffledYB.map((member) => {
    let num = shuffledYB.indexOf(member) % team_length;
    final_team[`${num + 1}조`].push(member);
    });

    return final_team;
     
}

console.log(matchingTeam(5));
