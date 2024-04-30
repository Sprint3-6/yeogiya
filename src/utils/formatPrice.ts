/**
 * @description 주어진 숫자를 지역화된 문자열로 변환합니다
 * @param num 숫자
 * @returns 3번째 자리마다 , 가 포함된 숫자
 */

export const formatPrice = (number: number) => number.toLocaleString();
