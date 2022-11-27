%{
#include "kudoaLexer.hh"
%}

%option noyywrap
%option c++
%option yyclass="KudoaLexer"
%option prefix="kd"

TokenAsc [\x21-\x5a\x5e-\x7a\x7c\x7e]
TokenSpecial (\\\{)|(\\\})|(\\\[)|(\\\])|(\\.)|(::)
TokenStr (lang)|(row)|(token)

U [\x80-\xbf]
U2 [\xc2-\xdf]
U3 [\xe0-\xef]
U4 [\xf0-\xf4]
Utf8 {U2}{U}|{U3}{U}{U}|{U4}{U}{U}{U}

%%
\{ { col += YYLeng(); return 1; }
\} { col += YYLeng(); return 2; }
\[ { col += YYLeng(); return 3; }
\] { col += YYLeng(); return 4; }
lang { col += YYLeng(); return 5; }
row { col += YYLeng(); return 6; }
token { col += YYLeng(); return 7; }
(({TokenAsc}|{TokenSpecial}|{Utf8})+)|(:({TokenStr})) { col += YYLeng(); return 8; }
\n { col = 0; row++; }
. { col += YYLeng(); }
%%
