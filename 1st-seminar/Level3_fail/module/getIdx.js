/* 각 멤버별 인덱스를 부여하는 모듈 (참고: 남궁권) */

const getIndex = {
    index: (members) => {
      const OBidx = [];
      const YBidx = [];
      let index = 0;
      members.map((member) => {
        if (member.status === "OB") {
          OBidx.push(index++);
        } else {
          YBidx.push(index++);
        }
      });
      return [OBidx, YBidx];
    },
  };
  
  module.exports = getIndex.index;