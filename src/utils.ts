export const convertRuleNameToClassName = (ruleName: string) => {
  return `md-${ruleName.replace(/_/g, "-")}`;
};
