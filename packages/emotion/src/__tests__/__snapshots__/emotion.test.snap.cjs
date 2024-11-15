// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`does not evaluate styles when noop 1`] = `"<div></div>"`;

exports[`does not forward doNotForward 1`] = `"<style type=\\"text/css\\">.essex-1wd5wji{background-color:fuscia;}</style><div class=\\"essex-1wd5wji\\"></div>"`;

exports[`multiple renders against shared cache and collection: collection 1`] = `
Set {
  ".essex-tokvmb{color:red;}",
  ".essex-14ksm7b{color:blue;}",
}
`;

exports[`multiple renders against shared cache and collection: result1 1`] = `"<div class=\\"essex-tokvmb\\"></div>"`;

exports[`multiple renders against shared cache and collection: result2 1`] = `"<div class=\\"essex-14ksm7b\\"></div>"`;

exports[`passes \`props\` to another styled component 1`] = `"<style type=\\"text/css\\">.essex-1uwbsch{background-color:purple;}</style><div class=\\"essex-1uwbsch\\"></div>"`;

exports[`passes \`props\`, with no styles 1`] = `"<div role=\\"slider\\"></div>"`;

exports[`renders a styled div 1`] = `"<style type=\\"text/css\\">.essex-d56twg{font-weight:bold;}.essex-d56twg a{-webkit-text-decoration:none;text-decoration:none;}</style><div class=\\"essex-d56twg\\"></div> - <div class=\\"essex-d56twg\\"></div>"`;

exports[`renders a styled styled element 1`] = `
"<style type=\\"text/css\\">.essex-1xu3tth{color:black;}
.essex-d56twg{font-weight:bold;}.essex-d56twg a{-webkit-text-decoration:none;text-decoration:none;}</style><div class=\\"essex-d56twg essex-1xu3tth\\"></div>"
`;

exports[`renders global styles 1`] = `"<style type=\\"text/css\\">html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;box-sizing:border-box;-webkit-text-size-adjust:100%;}*,*::before,*::after{box-sizing:inherit;}strong,b{font-weight:700;}body{margin:0;color:rgba(0, 0, 0, 0.87);font-family:\\"Roboto\\",\\"Helvetica\\",\\"Arial\\",sans-serif;font-weight:400;font-size:1rem;line-height:1.5;letter-spacing:0.00938em;background-color:#fff;}@media print{body{background-color:#fff;}}body::backdrop{background-color:#fff;}</style>"`;

exports[`renders nested 1`] = `
"<style type=\\"text/css\\">.essex-7kmldq{color:orange;}
.essex-tokvmb{color:red;}</style><div><div class=\\"essex-7kmldq\\"></div> - <div class=\\"essex-tokvmb\\"></div></div>"
`;

exports[`renders with a class label 1`] = `"<style type=\\"text/css\\">.essex-1f7rpne-MyComponent{font-weight:bold;}</style><div class=\\"essex-1f7rpne-MyComponent\\"></div>"`;

exports[`renders with a theme 1`] = `"<style type=\\"text/css\\">.essex-11glsol{font-weight:bold;}.essex-11glsol a{color:hotpink;}</style><div class=\\"essex-11glsol\\"></div> - <div class=\\"essex-11glsol\\"></div>"`;
