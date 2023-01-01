%{
#include "dicaudaLexer.hh"
%}

%option noyywrap
%option c++
%option yyclass="DicaudaLexer"
%option prefix="dc"

TokenAsc [\x21-\x27\x2a-\x3b\x3d\x3f-\x5a\x5e-\x7a\x7c\x7e]
TokenSpecial (\\\{)|(\\\})|(\\\[)|(\\\])|(\\\<)|(\\\>)|(\\\()|(\\\))|(\\.)|(::)
TokenStr (lang)|(row)|(token)|(node)

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
\< { col += YYLeng(); return 5; }
\> { col += YYLeng(); return 6; }
\( { col += YYLeng(); return 7; }
\) { col += YYLeng(); return 8; }
lang { col += YYLeng(); return 9; }
row { col += YYLeng(); return 10; }
token { col += YYLeng(); return 11; }
node { col += YYLeng(); return 12; }
(({TokenAsc}|{TokenSpecial}|{Utf8})+)|(:({TokenStr})) { col += YYLeng(); return 13; }
\n { col = 0; row++; }
. { col += YYLeng(); }
%%
