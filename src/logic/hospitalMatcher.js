function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}


export function findBestHospital(
  hospitals,
  accidentLatitude,
  accidentLongitude,
  severity
) {
  if (!hospitals || hospitals.length === 0) {
    return null;
  }

  const traumaScore = {
    1: 100,
    2: 60,
    3: 30
  };

  const hospitalsWithDistance = hospitals.map((hospital) => {
    const distance = calculateDistance(
      accidentLatitude,
      accidentLongitude,
      hospital.latitude,
      hospital.longitude
    );

    return {
      ...hospital,
      distance: Number(distance.toFixed(2))
    };
  });

  const availableHospitals =
    hospitalsWithDistance.filter(
      (hospital) => hospital.availability
    );

  if (availableHospitals.length === 0) {
    return null;
  }

  const scoredHospitals = availableHospitals.map(
    (hospital) => {
      const trauma = traumaScore[hospital.traumaLevel] || 0;

      const availability = 100;

      const distanceScore = Math.max(
        0,
        100 - hospital.distance * 10
      );

      let score;

      if (severity === "Critical") {
        score =
          trauma * 0.5 +
          availability * 0.3 +
          distanceScore * 0.2;
      } else {
        score =
          trauma * 0.3 +
          availability * 0.3 +
          distanceScore * 0.4;
      }

      return {
        ...hospital,
        score: Number(score.toFixed(2))
      };
    }
  );

  scoredHospitals.sort(
    (a, b) => b.score - a.score
  );

  return scoredHospitals;
}