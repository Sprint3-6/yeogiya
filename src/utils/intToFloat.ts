/**
 * @description 정수를 소수점으로 변환해주는 함수입니다 (ex. inToFloat(10, 2) = 10.00)
 * @param number 소수점을 반영할 숫자
 * @param decPlaces 반영되길 원하는 소수점 자리수
 * @returns 소수점이 반영된 숫자
 */

export const intToFloat = (number: number, decPlaces: number) => number.toFixed(decPlaces);
