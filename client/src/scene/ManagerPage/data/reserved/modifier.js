function modifier (obj) {
  const { coverage } = obj;
  const coverageDesktop = coverage.desktop;
  const coverageMobile = coverage.mobile;
  const coverageAll = coverageDesktop + coverageMobile;
  return {
    ...obj,
    coverageDesktop,
    coverageMobile,
    coverageAll,
  }
}
export default function (input) {
  if (Array.isArray(input)) {
    return input.map(modifier);
  }
  else if (typeof input === 'object') {
    return modifier(input);
  }
  return undefined;
}