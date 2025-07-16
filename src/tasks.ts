import type { PluginSimple } from "markdown-it";
import type StateCore from "markdown-it/lib/rules_core/state_core.mjs";
import type { Token } from "markdown-it/index.js";

import { convertRuleNameToClassName } from "./utils";

export const TASKS_RULE_NAME = "tasks";

const RENDER_OPEN_NAME = `${TASKS_RULE_NAME}_open`;
const RENDER_CLOSE_NAME = `${TASKS_RULE_NAME}_close`;

const STATE_MAP: Record<string, string> = {
  " ": "TODO",
  "\u00A0": "TODO",
  x: "DONE",
  X: "DONE",
  "~": "DOING",
  "-": "CANCELLED",
  "!": "IMPORTANT",
};

// const PATTERN = /^\[(\u00A0| |x|X|~|-|!)\] (.+)$/;
const PATTERN = new RegExp(
  `^\\[(${Object.keys(STATE_MAP)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})\\] (.+)$`
);
// console.log(PATTERN);

export interface TaskOptions {
  className?: string;
  render_open?: string;
  render_close?: string;
}

export const Tasks: (options?: TaskOptions) => PluginSimple = ({
  className = convertRuleNameToClassName(TASKS_RULE_NAME),
  render_open,
  render_close,
} = {}) => {
  return (md) => {
    md.core.ruler.after("inline", TASKS_RULE_NAME, (state) =>
      processTaskTokens(state)
    );

    md.renderer.rules[RENDER_OPEN_NAME] = (tokens, idx) => {
      const state = tokens[idx]?.attrGet("state")!;
      const checked = ["DONE", "CANCELLED"].includes(state);

      return (
        render_open ||
        `<span class="${className}"><input type="checkbox" disabled${
          checked ? " checked" : ""
        }><span>${state}</span>`
      );
    };

    md.renderer.rules[RENDER_CLOSE_NAME] = () => {
      return render_close || `</span>`;
    };
  };
};

const processTaskTokens = (state: StateCore): boolean => {
  for (let i = 0; i < state.tokens.length; i++) {
    const prev = i > 0 ? state.tokens[i - 1] : null;
    const curr = state.tokens[i];

    const isFirstInlineToken =
      curr.type === "inline" &&
      curr.children?.length &&
      (!prev || prev.type === "paragraph_open");

    if (isFirstInlineToken) {
      const match = curr.children![0].content.match(PATTERN);
      if (match) {
        return genTaskTokens(state, curr, match);
      }
    }
  }

  return false;
};

const genTaskTokens = (
  state: StateCore,
  token: Token,
  match: RegExpMatchArray
) => {
  const children = token.children!;

  // opening token
  const openingToken = new state.Token(RENDER_OPEN_NAME, "", 1);
  openingToken.attrSet("state", STATE_MAP[match[1]]);
  children.unshift(openingToken);

  // the remaining text
  children[0].content = match[2];

  // closing token
  const closingToken = new state.Token(RENDER_CLOSE_NAME, "", -1);
  children.push(closingToken);

  return true;
};
