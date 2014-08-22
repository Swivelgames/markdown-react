'use strict';

var fs = require('fs');
var util = require('util');

var markdown = require('markdown').markdown;
var React = require('react');

var build = require('./buildMarkdownTree');
var EL = require('./markdownElements');
var rBuildTop = require('./reactRender').buildTop;


function main() {
  var builders = {};
  builders[EL.BULLETLIST] = build.customBuildFactory(EL.BULLETLIST);
  builders[EL.BLOCKQUOTE] = build.customBuildFactory(EL.BLOCKQUOTE);
  builders[EL.EM] = build.customBuildFactory(EL.EM);
  builders[EL.HEADER] = build.buildHeader;
  builders[EL.INLINECODE] = build.customBuildFactory(EL.INLINECODE);
  builders[EL.LINKREF] = build.buildLinkRef;
  builders[EL.LISTITEM] = build.buildListitem;
  builders[EL.NUMBERLIST] = build.customBuildFactory(EL.NUMBERLIST);
  builders[EL.PARA] = build.customBuildFactory(EL.PARA);
  builders[EL.STRONG] = build.customBuildFactory(EL.STRONG);
  var builder = new build.Builder(builders);


  var text = fs.readFileSync('text.md', 'utf-8');
  var syntax = markdown.parse(text);
  console.log(util.inspect(syntax, {depth: 10}));

  var top = builder.buildTop(syntax.slice(1));

  console.log('XXXXXXXXXXXX');
  console.log(util.inspect(top, {depth: null}));


  console.log(React.renderComponentToStaticMarkup(rBuildTop(top)));
}

main();
