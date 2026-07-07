window.luyepaiReportPages = Array.from({ length: 23 }, (_, index) => {
  const pageNumber = String(index + 1).padStart(2, "0");

  return {
    src: `assets/luyepai-report/page-${pageNumber}.webp`,
    alt: `陆野派车载露营手冲咖啡机项目报告册第 ${index + 1} 页`,
  };
});
