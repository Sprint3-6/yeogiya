const categoryFilter = (score: number | undefined) => {
  if (score) {
    if (score === 5) {
      return '대만족';
    } else if (score >= 4) {
      return '매우 만족';
    } else if (score >= 3) {
      return '대체로 만족';
    } else if (score >= 2) {
      return '살짝 만족';
    } else if (score >= 1) {
      return '노만족';
    } else {
      return '추천안함';
    }
  }
};

export default categoryFilter;
