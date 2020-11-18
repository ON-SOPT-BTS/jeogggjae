
// 팀원들을 소개할 수 있는 json array 만들기
// 팀원들의 이름, 사는 곳, 나이, 취미, 정보를 출력하는 함수를 포함

const on_members = [
    {
        name: "김정재",
        location: "Gimpo",
        age: "OB",
        hobby: "넷플릭스",
        info: "놀자~"
    },
    {
        name: "김가영",
        location: "Seoul",
        age: "24",
        hobby: "넷플릭스",
        info: "공부하자~"
    },
    {
        name: "김현기",
        location: "Seoul",
        age: "27",
        hobby: "술먹기",
        info: "술먹자~"
    },
    {
        name: "안재은",
        location: "Seoul",
        age: "24",
        hobby: "책읽기",
        info: "책읽자~"
    },
    {
        name: "임찬기",
        location: "Seoul",
        age: "25",
        hobby: "술마시기",
        info: "술마시자~"
    },
    {
        name: "최선욱",
        location: "Seoul",
        age: "24",
        hobby: "운동하기",
        info: "운동하자~"
    }
]

const getMemberList = (on_members) =>{
    member_num = 1;
    on_members.filter(member =>{
        console.log(`<${member_num}번째 멤버>`)
        console.log(`이름: ${member.name}`);
        console.log(`사는곳: ${member.location}`);
        console.log(`나이: ${member.age}`);
        console.log(`취미: ${member.hobby}`);
        console.log(`정보: ${member.info}`);
        console.log("\n");
        member_num++;
    }); 
}

getMemberList(on_members);
