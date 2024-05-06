interface ImageData {
  id: number;
  imageUrl: string;
}

interface PreSchedule {
  date: string;
  startTime: string;
  endTime: string;
  id: number;
}

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

export function findMissingImgIds(a: ImageData[], b: string[]): number[] {
  const missingIds: number[] = [];
  const bUrlsSet: Set<string> = new Set(b);

  for (const { id, imageUrl } of a) {
    if (!bUrlsSet.has(imageUrl)) {
      missingIds.push(id);
    }
  }

  return missingIds;
}

export function findNewImgUrl(a: ImageData[], b: string[]) {
  const newUrl: string[] = [];
  const aUrls = a.map((arr) => arr.imageUrl);
  const aUrlsSet: Set<string> = new Set(aUrls);
  for (const url of b) {
    if (!aUrlsSet.has(url)) {
      newUrl.push(url);
    }
  }

  return newUrl;
}

export function findMissingScheduleIds(a: PreSchedule[], b: Schedule[]): number[] {
  const missingIds: number[] = [];
  for (const itemA of a) {
    if (!b.some((itemB) => itemB.startTime === itemA.startTime && itemB.endTime === itemA.endTime)) {
      missingIds.push(itemA.id);
    }
  }
  return missingIds;
}

export function findNewScheduleData(a: PreSchedule[], b: Schedule[]) {
  const newSchedules: Schedule[] = [];
  for (const itemA of b) {
    if (!a.some((itemB) => itemB.startTime === itemA.startTime && itemB.endTime === itemA.endTime)) {
      newSchedules.push(itemA);
    }
  }
  return newSchedules;
}
