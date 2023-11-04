/* eslint-disable @typescript-eslint/no-var-requires */
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();

md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
  var token = tokens[idx],
    info = token.info ? md.utils.unescapeAll(token.info).trim() : "",
    langName = "",
    langAttrs = "",
    highlighted,
    i,
    arr,
    tmpAttrs,
    tmpToken;

  if (info) {
    arr = info.split(/(\s+)/g);
    langName = arr[0];
    langAttrs = arr.slice(2).join("");
  }

  if (options.highlight) {
    highlighted = options.highlight(token.content, langName, langAttrs) || md.utils.escapeHtml(token.content);
  } else {
    highlighted = token.content;
  }

  if (highlighted.indexOf("<pre") === 0) {
    return highlighted + "\n";
  }

  // If language exists, inject class gently, without modifying original token.
  // May be, one day we will add .deepClone() for token and simplify this part, but
  // now we prefer to keep things local.
  if (info) {
    i = token.attrIndex("class");
    tmpAttrs = token.attrs ? token.attrs.slice() : [];

    if (i < 0) {
      tmpAttrs.push(["class", options.langPrefix + langName]);
    } else {
      tmpAttrs[i] = tmpAttrs[i].slice();
      tmpAttrs[i][1] += " " + options.langPrefix + langName;
    }

    // Fake token just to render attributes
    tmpToken = {
      attrs: tmpAttrs,
    };

    return {
      text: '<pre class="hljs"><code' + slf.renderAttrs(tmpToken) + ">" + highlighted + "</code></pre>\n",
      node: {
        tag: "code",
        type: "fence",
        body: highlighted,
        attrs: { lang: langName },
      },
    };
  }

  return {
    text: '<pre class="hljs"><code' + slf.renderAttrs(token) + ">" + highlighted + "</code></pre>\n",
    node: {
      tag: "code",
      type: "fence",
      body: highlighted,
      attrs: { lang: langName },
    },
  };
};

md.renderer.renderInline = function (tokens, options, env) {
  let type,
    result = "",
    rules = this.rules;

  for (let i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (type === "image") {
      return rules[type](tokens, i, options, env, this);
    }

    if (typeof rules[type] !== "undefined") {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options);
    }
  }

  return result;
};

const defaultRender = md.renderer.rules.image;

md.renderer.rules.image = function (tokens, idx, options, env, self) {
  let token = tokens[idx];

  if (token.type === "image") {
    return {
      type: token.type,
      tag: token.tag,
      attrs: { ...Object.fromEntries(token.attrs), alt: token.content },
    };
  }

  return defaultRender(tokens, idx, options, env, self);
};

md.renderer.render = function (tokens, options, env) {
  let i,
    len,
    tag,
    type,
    nesting,
    result = "",
    isTagOpened = 0,
    elements = [],
    currentElement = {},
    rules = this.rules;

  for (i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type.replace("_open", "");
    nesting = tokens[i].nesting;
    tag = tokens[i].tag;

    if (nesting !== 0) {
      if (nesting === 1) {
        isTagOpened += 1;
      }
    }

    if (type === "inline") {
      const inline = this.renderInline(tokens[i].children, options, env);

      if (typeof inline === "string") {
        result += inline;

        if (isTagOpened && nesting === 0) {
          currentElement.body = inline;
        }
      } else {
        currentElement = inline;
      }
    } else if (typeof rules[type] !== "undefined") {
      const content = rules[type](tokens, i, options, env, this);

      if (type === "fence") {
        elements.push({ id: i, type, ...content.node });

        result += content.text;
      } else {
        result += content;
      }
    } else {
      result += this.renderToken(tokens, i, options, env);

      if (!isTagOpened && nesting === 0) {
        elements.push({ id: i, tag, type });
      }
    }

    if (nesting === 1) {
      if (typeof currentElement.tag !== "undefined" && currentElement.tag !== tag) {
        const child = { id: i, tag, type, parrent: currentElement };

        currentElement.body = [...(currentElement.body || [])];
        currentElement.body.push(child);
        currentElement = child;
      } else {
        currentElement.tag = tag;
        currentElement.type = type;
      }
    } else if (nesting === -1) {
      if (!currentElement.parrent && !currentElement.inner) {
        currentElement.id = i;
        elements.push(currentElement);
        currentElement = {};
        isTagOpened = isTagOpened - 1;
      } else {
        const temp = currentElement;

        currentElement.inner = true;
        currentElement = currentElement.parrent;
        delete temp.parrent;
        isTagOpened = isTagOpened - 1;
      }
    }
  }

  const clean = () => {
    const iterable = (obj) => {
      delete obj.inner;

      if (obj.body && typeof obj.body !== "string") {
        obj.body.forEach((el) => iterable(el));
      }
    };

    elements.forEach((el) => iterable(el));
  };

  clean();

  return { result, elements };
};

function parseMarkdown(data) {
  return md.render(data);
}

module.exports = parseMarkdown;
