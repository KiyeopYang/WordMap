function modifier (obj) {
  const { coverage, result } = obj;
  const coverageDesktop = coverage.desktop;
  const coverageMobile = coverage.mobile;
  const coverageAll = coverageDesktop + coverageMobile;

  const resultDesktop = result.desktop;
  const resultMobile = result.mobile;

  // 이렇게 나눈 것은 테이블에 이용하기 용이하므로.
  const resultDesktopSuccess = resultDesktop.success;
  const resultDesktopFailure = resultDesktop.failure;
  const resultDesktopClicked = resultDesktop.clicked;
  const resultMobileSuccess = resultMobile.success;
  const resultMobileFailure = resultMobile.failure;
  const resultMobileClicked = resultMobile.clicked;
  const resultSuccess = resultDesktopSuccess + resultMobileSuccess;
  const resultFailure = resultDesktopFailure + resultMobileFailure;
  const resultProcessed = resultSuccess + resultFailure;
  const resultInProcess = coverageAll - resultProcessed;
  const resultClicked = resultDesktopClicked + resultMobileClicked;
  const resultSuccessRatio = Math.round(100 * resultSuccess / coverageAll);
  const resultFailureRatio = Math.round(100 * resultFailure / coverageAll);
  const resultProcessedRatio = Math.round(100 * resultProcessed / coverageAll);
  const resultClickedRatio = Math.round(100 * resultClicked / resultSuccess);
  return {
    ...obj,
    coverageDesktop,
    coverageMobile,
    coverageAll,
    resultDesktopSuccess,
    resultDesktopFailure,
    resultDesktopClicked,
    resultMobileSuccess,
    resultMobileFailure,
    resultMobileClicked,
    resultSuccess,
    resultFailure,
    resultProcessed,
    resultInProcess,
    resultClicked,
    resultSuccessRatio,
    resultFailureRatio,
    resultProcessedRatio,
    resultClickedRatio,
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