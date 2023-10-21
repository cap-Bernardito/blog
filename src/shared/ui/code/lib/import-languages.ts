export type Language =
  | "python"
  | "js"
  | "javascript"
  | "shell"
  | "sql"
  | "yaml"
  | "typescript"
  | "xml"
  | "bash"
  | "c"
  | "css"
  | "markdown"
  | "diff"
  | "ruby"
  | "go"
  | "graphql"
  | "ini"
  | "scss";

export const loadLanguageModule = async (language: Language) => {
  let module;

  // Взял отсюда highlight.js/lib/common.js
  switch (language) {
    case "python":
      module = import(/* webpackChunkName: "lang_pyton" */ "highlight.js/lib/languages/python");
      break;
    case "js":
    case "javascript":
      module = import(/* webpackChunkName: "lang_javascript" */ "highlight.js/lib/languages/javascript");
      break;
    case "xml":
      module = import(/* webpackChunkName: "lang_xml" */ "highlight.js/lib/languages/xml");
      break;
    case "bash":
      module = import(/* webpackChunkName: "lang_bash" */ "highlight.js/lib/languages/bash");
      break;
    case "c":
      module = import(/* webpackChunkName: "lang_c" */ "highlight.js/lib/languages/c");
      break;
    case "css":
      module = import(/* webpackChunkName: "lang_css" */ "highlight.js/lib/languages/css");
      break;
    case "markdown":
      module = import(/* webpackChunkName: "lang_markdown" */ "highlight.js/lib/languages/markdown");
      break;
    case "diff":
      module = import(/* webpackChunkName: "lang_diff" */ "highlight.js/lib/languages/diff");
      break;
    case "ruby":
      module = import(/* webpackChunkName: "lang_ruby" */ "highlight.js/lib/languages/ruby");
      break;
    case "go":
      module = import(/* webpackChunkName: "lang_go" */ "highlight.js/lib/languages/go");
      break;
    case "graphql":
      module = import(/* webpackChunkName: "lang_graphql" */ "highlight.js/lib/languages/graphql");
      break;
    case "ini":
      module = import(/* webpackChunkName: "lang_ini" */ "highlight.js/lib/languages/ini");
      break;
    case "scss":
      module = import(/* webpackChunkName: "lang_scss" */ "highlight.js/lib/languages/scss");
      break;
    case "shell":
      module = import(/* webpackChunkName: "lang_shell" */ "highlight.js/lib/languages/shell");
      break;
    case "sql":
      module = import(/* webpackChunkName: "lang_sql" */ "highlight.js/lib/languages/sql");
      break;
    case "yaml":
      module = import(/* webpackChunkName: "lang_yaml" */ "highlight.js/lib/languages/yaml");
      break;
    case "typescript":
      module = import(/* webpackChunkName: "lang_typescript" */ "highlight.js/lib/languages/typescript");
      break;
  }

  return module;
};
