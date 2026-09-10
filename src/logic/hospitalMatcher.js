export function findBestHospital(hospitals, severity) {
  const availableHospitals = hospitals.filter(
    (hospital) => hospital.availability
  );

  if (availableHospitals.length === 0) {
    return null;
  }

  let suitableHospitals = availableHospitals;

  if (severity === "Critical") {
    const traumaHospitals = availableHospitals.filter(
      (hospital) => hospital.traumaLevel === 1
    );

    if (traumaHospitals.length > 0) {
      suitableHospitals = traumaHospitals;
    }
  }

  suitableHospitals.sort(
    (a, b) => a.distance - b.distance
  );

  return suitableHospitals[0];
}