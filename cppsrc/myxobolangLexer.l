%{
#include "myxobolangLexer.hh"
%}

%option noyywrap
%option c++
%option yyclass="MyxobolangLexer"
%option prefix="ml"

NotEmpty [\x21-\x7e]

U [\x80-\xbf]
U2 [\xc2-\xdf]
U3 [\xe0-\xef]
U4 [\xf0-\xf4]
Utf8 {U2}{U}|{U3}{U}{U}|{U4}{U}{U}{U}

%%
:: { col += YYLeng(); return 1; }
(({NotEmpty})|({Utf8}))+ { col += YYLeng(); return 2; }
\n { col = 0; row++; }
. { col += YYLeng(); }
%%