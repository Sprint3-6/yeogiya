const categoryFilter = (word: string | undefined) => {
  switch (word) {
    case '문화 · 예술':
      return '파티룸';
    case '식음료':
      return '이벤트홀';
    case '스포츠':
      return '스튜디오';
    case '투어':
      return '공연장';
    case '관광':
      return '회의실';
    case '웰빙':
      return '연습실';
    default:
      return '모든 공간';
  }
};

export default categoryFilter;
