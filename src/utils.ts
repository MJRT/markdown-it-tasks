export const convertRuleNameToClassName = (ruleName: string) => {
  return ruleName.replace(/_/g, "-");
};
