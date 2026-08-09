interface PetTargetInput {
  species?: "CAT" | "DOG" | "ETC";
  weight?: number;
  age?: number;
}

export const calculatePetTargets = (petData?: PetTargetInput | null ) => {
  const { species, weight, age } = petData || {};

  // 체중 정보가 없거나 ETC인 경우 기본값 반환
  if (!weight || weight <= 0 || species === "ETC") {
    return {
      maxActivity: 60,
      maxFeed: 100,
      maxWater: 250,
    };
  }

  const isYoung = age !== undefined && age < 1;
  const isSenior = age !== undefined && age >= 7;

  // 1. maxActivity (활동시간 - 분)
  let maxActivity = 60;
  if (species === "CAT") {
    maxActivity = 30; // 고양이는 체중 무관 30분 권장
  } else if (species === "DOG") {
    maxActivity = Math.min(Math.max(Math.round(weight * 10), 30), 120); // 최소 30분 ~ 최대 120분
  }

  // 2. maxFeed (사료량 - g)
  // RER = 70 * (weight ^ 0.75)
  const rer = 70 * Math.pow(weight, 0.75);
  let factor = 1.6; // 기본값: 성견 기준

  if (species === "CAT") {
    if (isYoung) factor = 2.0;
    else if (isSenior) factor = 1.1;
    else factor = 1.2;
  } else if (species === "DOG") {
    if (isYoung) factor = 2.0;
    else if (isSenior) factor = 1.4;
    else factor = 1.6;
  }

  const dailyKcal = rer * factor;
  const kcalPerGram = 3.8; // 일반 건식사료 평균 칼로리
  const maxFeed = Math.round(dailyKcal / kcalPerGram);

  // 3. maxWater (음수량 - ml)
  const waterFactor = species === "CAT" ? 45 : 55;
  const maxWater = Math.round(weight * waterFactor);

  return {
    maxActivity,
    maxFeed,
    maxWater,
  };
};