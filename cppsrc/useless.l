%{
/**
 * Fuck c++ and node.js addon api!
 * 没有这个文件，nodejs会报“找不到yyFlexLexer”错误
 */
%}

%option noyywrap
%option c++

%%
. { return 0; }
%%